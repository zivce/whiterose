<?php

namespace App\Http\Controllers;

use PDF;
use Dompdf\Adapter\PDFLib;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Website;
use App\Client;
use Illuminate\Support\Facades\Redirect;
use App\Job;
use App\Pentester;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use App\Scan;
use App\Bid;
use GuzzleHttp\Client as fakingGazl;
use App\Started_job;
use App\Discusion;
use App\Message;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\DB;

use phpseclib\Net\SSH2 as ssh;



//Client::setStripeKey('pk_test_dFVBeyPGEdmiqOpIv5lovgeE');




class ClientController extends Controller
{
    public $passwordResetEmail;
    //verifing domain
    public function addNewWebsite(Request $request)
    {
        $client_id=Auth::guard('client')->user()->id;
        $siteName=$request->site;
        if(Website::where('domain',$siteName)->first())
            return "Website already exists!";
    
        $newSite=new Website;
        $newSite->domain=$siteName;
        $newSite->confirmationCode=str_random(30);
        $newSite->confirmed=0;
        $newSite->client_id=Auth::guard('client')->user()->id;
        $newSite->save();
       
    }

    public function allSites()
    {
        if(Website::where('client_id',Auth::guard('client')->user()->id)!==null)
        return Website::where('client_id',Auth::guard('client')->user()->id)->get();
        return "You dont have any websites";
    }
    public function downloadKey($site)
    {
        
        $confirmationCode=Website::where('domain',$site)->first()->confirmationCode;
        $site=$site.'.txt';
        Storage::put($site,$confirmationCode);
        $absolutePath=storage_path('app\\'.$site);
      
         return response()->download($absolutePath,'ver.txt');//->deleteFileAfterSend(true);
    }
    public function confirmSite(Request $request)
    {
       $siteDomain='http://'.$request->site['site'].'/ver.txt';
       $client=new fakingGazl();
       $resp=$client->get($siteDomain);
       
      // $retVal= Redirect::to($siteDomain);
      
       $siteName=$request->site['site'];
       
       $cmpCode=Website::where('domain',$siteName)->first()->confirmationCode;
       //return $resp->getBody();
       
       if(strcmp($cmpCode,$resp->getBody())==0)
       {
           $confirmedSite=Website::where('domain',$siteName)->first();
           $confirmedSite->confirmed=1;
           $confirmedSite->save();
           
       }

    }
    public function verifiedSites()
    {
        return Website::where('client_id',Auth::guard('client')->user()->id)
                        ->where('confirmed',1)
                        ->select('domain')
                        ->get();

                        
    }
    public function postDesc(Request $request)
    {
        $client=Auth::guard('client')->user();
        $client->description=$request->send;
        $client->save();
        return $client->description;
    }
    public function uploadAvatar(Request $request)
    {

         $image=$request->avatar;
         $client=Auth::guard('client')->user();
         //$dirName=Auth::guard('client')->user()->name.Auth::guard('client')->user()->id;
         //Storage::makeDirectory($dirName);
         $fileName=Carbon::now()->toDateTimeString().'.'.$image->getClientOriginalExtension();
         $fileName=str_replace(' ','_',$fileName);
         $fileName=str_replace(':','_',$fileName);
         //Storage::putFileAs($dirName,$image,$fileName);
         Image::make($image)->resize(300,300)->save(public_path('uploads\\images\\'.$fileName));
         $client->image_path='public\\uploads\\images\\'.$fileName;
         $client->save();
         return 'public\\uploads\\images\\'.$fileName;
    }

    //buying and transfering tokens
    public function buyTokens(Request $request)
    {
        //$token = $request->token->token;
        $amount=$request->amount;
        $price=$amount*5*100;
        // $charge = \Stripe\Charge::create([
        //     'amount' =>  $price,
        //     'currency' => 'usd',
        //     'description' => 'Buying'.$amount.'tokens'.'Price is'.$price.'$',
        //     'source' => $request->id,
        // ]);
        $client=Client::where('id',Auth::guard('client')->user()->id)->first();
        $client->tokens+=$amount;
        $client->save();
        return $client->tokens;
               
    }
    public function resetPw(Request $request)
    {
        $client=Auth::guard('client')->user();
        $client->password=Hash::make($request->send['newpw']);
        $client->save();
        return $request->send['newpw'];
    }
    //delete job
    public function deleteJob(Request $request)
    {
        Job::where('id',$request->id)->first()->delete();
        return "Job has been deleted!";
    }
    //edit job
    public function editJob(Request $request)
    {
        
      $job=Job::where('id',$request->job_id)->first();
      
      $job->description=$request->new_desc;
      $job->maximum_price=$request->new_tokens;
      $job->save();
                
    }
    //posting job
    public function postJob(Request $request)
    {
        
        $job=new Job;
        $job->maximum_price=$request->price;
        $job->domain=$request->selected_site;
        $job->title=$request->title;
        $job->client_id=Auth::guard('client')->user()->id;
        $job->description=$request->desc;
        // $document=$request->file;

        $client=Auth::guard('client')->user();
        if($client->tokens<$request->price+2)
        return "You dont have tokens for this job post";
        $client->tokens=$client->tokens-2-$request->price;
        $client->save();

        // $dirName=Auth::guard('client')->user()->name.Auth::guard('client')->user()->id;
        // if($document!==null || !empty($document)){
        //     Storage::makeDirectory($dirName);
        //     $fileName=$dirName.'/'.Carbon::now()->toDateTimeString().'.'.$document->getClientOriginalExtension();
        //     $fileName=str_replace(' ','_',$fileName);
        //     $fileName=str_replace(':','_',$fileName);       
        //     Storage::putFileAs($dirName,$document,$fileName);

        //     $job->file_path=Storage::url('app/'.$dirName.'/'.$fileName);
        // }

        $website = Website::where('domain',$request->selected_site)->first();
        if($website->scans()->first()){
            $job->file_path=$website->scans()->first()->path;            
        }
        $job->save();


    }


   public function myJobs()
   {
       return Job::where('client_id',Auth::guard('client')->user()->id)->get();
   }

   public function myJob(Request $request)
   {
       return Job::where('client_id',Auth::user()->id)
                    ->where('title',$request->title)
                    ->get();
   }

   
   public function viewMyBiddedJobs(Request $request)
   {

       $clientID=Auth::guard('client')->user()->id;
       $client=Auth::guard('client')->user();
       
       $jobs = $client->jobs()->orderBy('created_at','DESC');
       $jobs_bids = $jobs->with('bids')->get();

       foreach($jobs_bids as $jb){
           foreach($jb->bids as $bid){
               $bid->pentester_username = Pentester::where('id',$bid->pentester_id)->first()->username;
               $bid->pentester_email = Pentester::where('id',$bid->pentester_id)->first()->email;
               $bid->pentester_rating = Pentester::where('id',$bid->pentester_id)->first()->rating;
           }
       }
       return $jobs_bids;



   }



   public function register(Request $request)
   {
    $request->validate([
        'email'    =>'required',
        'password' =>'required',
        'sameaspw'=>'required'
    ]);

    if(Client::where('email', '=', $request->email)->count()>0) {
        return 'This mail already exist';
        }
    if (!strcmp($request->password, $request->sameaspw )) {
        $client= new Client;
        $client->tokens=0;
        $client->username=$request->username;
        $client->name=$request->firstname;
        $client->name=$request->firstname;
        $client->lastname=$request->lastname;
        $client->email = $request->email;
        $client->password = Hash::make($request->password);
        $client->remember_token=str_random(100);
        $client->image_path = 'public\uploads\images\avatar_pentester.png';
        $client->description = 'Need help to secure my website.';
        
        $client->confirmation_code=str_random(30);
        $this->passwordResetEmail=$request->email;
      
        $confirmation_code=$client->confirmation_code;
       
        Mail::send('verifyClie',['confirmation_code'=>$confirmation_code], function($message){
            
            $message->to($this->passwordResetEmail);
            $message->subject('Verify your email');
        
        });
        $client->save();
     
     }
    }

    public function verifyAccount($token)
    {
        $client=Client::where('confirmation_code',$token)->first();
       
        if(!$client)
        {
            return "User does not exist";
        }
        $client->confirmed=1;
        $client->confirmation_code=null;
        $client->save();
        return redirect('/');
    }

    public function login(Request $request)
    {

        $email=$request->email;
        $password=$request->pw;
        $client=Client::where('email',$email)->first();
        if($client)
        {
        if($client->confirmed===0)
        {
            if($client->created_at==$client->updated_at){
                return 'Please verify your account';                
            }else{
                return 'Your account is suspended';
            }
        }
 
        
        if(Auth::guard('client')->attempt(['email'=>$email,'password'=>$password]))
        {
           
            $client=Auth::guard('client')->user();
            if($client->image_path===null){
                $avatar = 'public\uploads\images\avatar_client.png';
            }else{
                $avatar = $client->image_path;
            }
            $toReturn=['role'=>'client',
                        'id'=>$client->id,
                        'name'=>$client->name,
                        'email'=>$client->email,
                        'username'=>$client->username,
                        'lastname'=>$client->lastname,
                        'tokens'=>$client->tokens,
                        'avatar'=>$avatar,

            ];
            
            return $toReturn;
            
        }
        else
        {
           
            return 'Wrong username or password';
                  
        }
       }
      return 'User does not exist';
    }

    public function logout()
    {
        if(Auth::guard('client')->check())
        {
            Auth::guard('client')->logout();
            return view('lender');
        }
      
        
        
    }
    public function testScan()
    {
        

        $ssh = new ssh('45.33.31.236');
        if (!$ssh->login('root', 'L0g1n99')) {
            exit('Login Failed');
        }
        
       return $ssh->exec('ping www.google.com');
        
    }
    public function scan(Request $request)
    {
        $ssh = new ssh('45.33.31.236');
        if (!$ssh->login('root', 'L0g1n99')) {
            exit('Login Failed');
        }
        
        $scanN=$request->scan;
        $domain=$request->url;
        if(Website::where('domain',$domain)->first()->confirmed==0)
            return "Website is not confirmed!";
        $command = $request->cmd;
        $execute=$command.' '.$domain;
        // $execute="sudo"." ".$execute ." "."2>&1";
        // $output=shell_exec($execute);
        $output=$ssh->exec($command);
        $client=Auth::guard('client')->user();
        $client->tokens=$client->tokens-2;
        $client->save();
        $outputToRet=$output;
       if(Auth::guard('client')->user())
       {
          
           $dirName=Auth::guard('client')->user()->username.Auth::guard('client')->user()->id;
           Storage::makeDirectory($dirName);
           $date=Carbon::now();
           $date=str_replace(' ','_',$date);
           $date=str_replace(':','_',$date);
           
           $pdfOut=json_encode($output);
           $pdfOut=str_replace('\n','<br>',$pdfOut);
           $saveFileName=$dirName.'/'.$scanN.'_'.$date.'.pdf';
            
           Storage::put($saveFileName,$pdfOut);
           $scan=new Scan;
           $scan->website_id=Website::where('domain',$domain)->first()->id;
           $scan->path=Storage::url($saveFileName);
           $scan->scanName=$scanN;
           $scan->save();
          
     }

     return $outputToRet;
    }

    public function getScans()
    {
        $user = Auth::guard('client')->user();
        $websites = $user->websites();
        $scans = $websites->with('scans')->get();
        return $scans;
    }

    public function downloadScan($dir,$fileName)
    {
       //$dir=Auth::guard('client')->user()->name.Auth::guard('client')->user()->id;
        $absolutePath='app\\'.$dir.'\\'.$fileName;
        $path=storage_path($absolutePath);
        $outputPDF=File::get($path);
        $pdf=\App::make('dompdf.wrapper');
        $pdf->loadHTML($outputPDF);
        return $pdf->download($fileName);
    }

    public function acceptTheBid(Request $request)
    {
        $bidID=$request->bidID;
        $bid=Bid::where('id',$bidID)->first();
        $bid->accepted=1;
        $bid->save();

        $job=$bid->job()->first();
        $pentester=$bid->pentester()->first();

        $job->pentesters()->attach($pentester,['amount'=>$bid->amount,'started'=>1]);

        $job->inprogress=1;

        // $discusion=new Discusion;
        // $discusion->client_id=$job->client_id;
        // $discusion->pentester_id=$bid->pentester_id;
        // $discusion->job_id=$bid->job_id;
        $job->save();
        // $discusion->save();
        return "job accepted";
        
    }

    public function acceptJob(Request $request)
    {
        $job = Job::where('id',$request->send['job_id'])->first();
        // $bid=$job->bid()->get();
        // $cliet=$job->client()->get();
        // $pentester=$job->pentester()->get();


        
        $c_id = $job->client_id;
        $job = $job->pentesters()->first();

        DB::table('job_histories')->insert([
            ['pentester_id' => $job->pivot->pentester_id ,
             'job_id'=> $job->pivot->job_id, 
             'client_id' => $c_id,
             'price' => $job->pivot->amount,
             'review' => $request->send['review'],
             'rating' => $request->send['rating'],
             'created_at' => Carbon::now()],
        ]);

        $pentester = Pentester::where('id',$job->pivot->pentester_id)->first();
        $ratings = $pentester->ratingsFromClients()->get();
        $total_rating = 0;
        $n = 0;

        foreach($ratings as $rating){
            $total_rating += $rating->pivot->rating;
            $n++;
        }
        $pentester = Pentester::where('id',$job->pivot->pentester_id)->first();     
        $pentester->rating = $total_rating/$n;
        // $pentester->save();
        
        $client = Client::where('id',$c_id)->first();
        $client->tokens=$client->tokens-$job->pivot->amount;
        $pentester->tokens=$pentester->tokens+$job->pivot->amount;
        $client->save();
        $pentester->save();

        $job_completed = Job::where('id',$request->send['job_id'])->first();        
        $job_completed->completed = 1;
        $job_completed->inprogress = 0;
        $job_completed->save();
        
        return $job_completed;
        
    }

    public function declineJob(Request $request)
    {
        $job = Job::where('id',$request->job_id)->first();
        $client = Client::where('id',$job->client_id)->first();

        $job_pivot = $job->pentesters()->where('pentesters_jobs.job_id',$request->job_id)->first()->pivot;
        $job_pivot->finished = 0;
        $job_pivot->save();

        $message = new Message();
        $msg_arr = array();
        $msg = $client->username . " has declined your work!";
        array_push($msg_arr,$msg);
        $message->text = json_encode($msg_arr);
        $message->last = 1;
        $message->clientToPentester = 1;
        $message->discusion_id = $job->discusion->id;
        $message->save();
        return $message;        
    }
}
