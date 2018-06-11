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
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\DB;



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

    //delete job
    public function deleteJob(Request $request)
    {
        Job::where('id',$request->id)->first()->delete();
    }
    //edit job
    public function editJob(Request $request)
    {
      $job=Job::where('id',$request->id)->first();
      $job->description=$request->description;
      $job->price=$job->price;
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
        $document=$request->file;

        $client=Auth::guard('client')->user();
        if($client->tokens<$request->price+2)
        return "You dont have tokens for this job post";
        $client->tokens=$client->tokens-2;
        $client->save();
        $dirName=Auth::guard('client')->user()->name.Auth::guard('client')->user()->id;
        if($document!==null || !empty($document)){
            Storage::makeDirectory($dirName);
            $fileName=$dirName.'/'.Carbon::now()->toDateTimeString().'.'.$document->getClientOriginalExtension();
            $fileName=str_replace(' ','_',$fileName);
            $fileName=str_replace(':','_',$fileName);       
            Storage::putFileAs($dirName,$document,$fileName);

            $job->file_path=storage_path('app\\'.$dirName.'\\'.$fileName);
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
       
       $jobs = $client->jobs();
       $jobs_bids = $jobs->with('bids')->get();

       foreach($jobs_bids as $jb){
           foreach($jb->bids as $bid){
               $bid->pentester_username = Pentester::where('id',$bid->pentester_id)->first()->username;
               $bid->pentester_email = Pentester::where('id',$bid->pentester_id)->first()->email;
               $bid->pentester_rating = Pentester::where('id',$bid->pentester_id)->first()->rating;
           }
       }
       return $jobs_bids;


    //    $returnBids=array();

    //    foreach($jobs as $job){
    //         $bids=$job->bids()->get();
    //         foreach($bids as $bid)
    //         {
    //         array_push($returnBids,[
    //             'bid'=>$bid,
    //             'pentester_username'=>Pentester::where('id',$bid->pentester_id)->first()->username,
    //             'pentester_email'=>Pentester::where('id',$bid->pentester_id)->first()->email,
    //             'pentester_rating'=>Pentester::where('id',$bid->pentester_id)->first()->rating,
    //             'job_name'=>$job->title
    //         ]);
    //         }
    //    }

    //     return $returnBids;
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
        
        
        $client->confirmation_code=str_random(30);
        $this->passwordResetEmail=$request->email;
      
        $confirmation_code=$client->confirmation_code;
       
        Mail::send('verify',['confirmation_code'=>$confirmation_code], function($message){
            
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
        return redirect('home');
    }

    public function login(Request $request)
    {

        $email=$request->email;
        $password=$request->pw;
        $client=Client::where('email',$email)->first();
        if($client)
        {
        // if($client->confirmed==0)
        // {
        //     return 'Please verify your account';
        // }
        
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

    public function scan(Request $request)
    {
        $scanN=$request->scan;
        $domain=$request->domain;
        if(!Website::where('domain',$domain)->count>0)
            return "Website is not confirmed!";
        $command = $request->cmd;
        $execute=$command.' '.$domain;
        // $execute="sudo"." ".$execute ." "."2>&1";
        // $output=shell_exec($execute);
        $output=shell_exec('ping google.com');
        $scanN='ping';
        $outputToRet=$output;
       if(Auth::guard('client')->user())
       {
          
           $dirName=Auth::guard('client')->user()->name.Auth::guard('client')->user()->id;
           Storage::makeDirectory($dirName);
           $date=Carbon::now();
           $date=str_replace(' ','_',$date);
           $date=str_replace(':','_',$date);
           
           $pdfOut=json_encode($output);
           $pdfOut=str_replace('\n','<br>',$pdfOut);
           $saveFileName=$dirName.'/'.$scanN.'_'.$date.'.pdf';
            
           Storage::put($saveFileName,$pdfOut);
           $scan=new Scan;
           $scan->client_id=Auth::guard('client')->user()->id;
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
        $absolutePath='app/'.$dir.'/'.$fileName;
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
        $job = Job::where('id',$request->job_id)->first();
        $job = $job->pentesters()->first();

        DB::table('job_histories')->insert([
            ['pentester_id' => $job->pivot->pentester_id ,'job_id'=> $job->pivot->job_id, 'price' => $job->pivot->amount,'created_at' => Carbon::now()],
        ]);
        $job->finished = 0;
        $job_completed = Job::where('id',$request->job_id)->first();        
        $job_completed->completed = 1;
        $job_completed->save();
        
        // return $job->pentesters()->first();
        
    }

    public function declineJob(Request $request)
    {
        $job = Job::where('id',$request->job_id)->first();
    }
}
