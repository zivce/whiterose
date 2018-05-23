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
use App\Started_job;
use App\Discusion;








class ClientController extends Controller
{
    public $passwordResetEmail;
    //verifing domain
    public function addNewWebsite(Request $request)
    {
        $client_id=Auth::user()->id;
        $siteName=$request->siteName;
        if(!Website::where('siteName',$siteName)->first())
            return "Website already exists!";

        $newSite=new Website;
        $newSite->siteName=$siteName;
        $newSite->confimationCode=str_random(30);
        $newSite->confirmed=0;
        $newSite->save();
       
    }
    public function downloadKey(Request $request)
    {
        $siteName=$request->siteName;
        $confirmationCode=Website::where('siteName',$siteName)->first()->confirmationCode;
        $downloadFile='app\\'.$siteName;
        Storage::put($siteName,$confirmationCode);
        $absolutePath=storage_path($siteName);
        return response()->download($absolutePath)->deleteFileAfterSend(true);
    }
    public function confirmSite(Request $request)
    {
       $siteDomain='http://'.$request->siteName.'/text.txt';
       $retVal= Redirect::to($siteDomain);
      
       $siteName=$request->siteName;
       $cmpCode=Website::where('siteName',$siteName)->first()->confirmationCode;
       if($cmpCode===$retVal)
       {
           $confirmedSite=Website::where('siteName',$siteName)->first();
           $confirmedSite->confirmed=1;
           
       }

    }

    //buying and transfering tokens
    public function buyTokens(Request $request)
    {
        $token = $request->token;
        $amount=$request->amoutnt;
        $price=$amount*5*100;
        $charge = \Stripe\Charge::create([
            'amount' =>  $price,
            'currency' => 'usd',
            'description' => 'Buying'.$amount.'tokens'.'Price is'.$price.'$',
            'source' => $request->token,
        ]);
        $client=Client::where('id',$request->id)->first();
        $client->tokens=$amount;
        $client->save();
               
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
        $document=$request->document;

        $dirName=Auth::guard('client')->user()->name.Auth::guard('client')->user()->id;
        if($document!==null){
            Storage::makeDirectory($dirName);
            $fileName=$dirName.'/'.Carbon::now()->toDateTimeString().$document->getClientOriginalExtension();
            Storage::put($fileName,$document);
            $job->file_path=Storage::url($fileName);
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

       $clientID=$request->clientID;
       $jobID=$request->jobID;


       $returnBids=array();
       $bids=Bid::where('job_id',$jobID)
                    ->where('client_id',$clientID)
                    ->get();
        foreach($bids as $bid)
        {
            array_push($returnBids,[
                'amount'=>$bid->amount,
                'pentester_username'=>Pentester::where('id',$bid->pentester_id)->username,
                'pentester_email'=>Pentester::where('id',$bid->pentester_id)->email,
                'pentester_rating'=>Pentester::where('id',$bid->pentester_id)->rating
            ]);
        }
        return $returnBids;
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
        //$client->username=$request->username;
        $client->name=$request->firstname;
        $client->lastname=$request->lastname;
        $client->email = $request->email;
        $client->password = Hash::make($request->password);
        $client->remember_token=str_random(100);
        
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
            $toReturn=['role'=>'client',
                        'id'=>$client->id,
                        'name'=>$client->name,
                        'email'=>$client->email,
                        'username'=>$client->username,
                        'lastname'=>$client->lastname,
                        'tokens'=>$client->tokens,

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

        $job=$bid->job();
        $pentester=$bid->pentester();

        $job->pentesters()->attach($pentester,['amount'=>$bid->amount,'started'=>1]);

        $job->inprogress=1;

        $discusion=new Discusion;
        $discusion->client_id=$bid->client_id;
        $discusion->penester_id=$bid->pentester_id;
        $discusion->job_id=$bid->job_id;
        $job->save();
        $discusion->save();
        
    }
}
