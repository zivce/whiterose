<?php

namespace App\Http\Controllers;

use Illuminate\Http\File;
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
            'source' => 'tok_KPte7942xySKBKyrBu11yEpf',
        ]);
       (Client::where('id',$request->id)->first()->tokens=$amount)->save();
    }

    //posting job
    public function postJob(Request $request)
    {
        $job=new Job;
        $job->startingPrice=$request->price;
        $job->domain=$request->domain;
        $job->title=$request->title;
        $job->client_id=$request->clientID;
        $job->description=$request->description;
        $job->save();


    }


   public function myJobs()
   {
       return Job::where('id',Auth::user()->id)->get();
   }
   public function myJob()
   {
       
   }
   public function viewMyBiddedJobs(Request $request)
   {

       $clientID=$request->clientID;
       $jobID=$request->jobID;


       $returnBids=array();
       $bids=Bids::where('job_id',$jobID)
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
        if($client->confirmed==0)
        {
            return 'Please verify your account';
        }
        
        if(Auth::guard('client')->attempt(['email'=>$email,'password'=>$password]))
        {
           
            $client=Auth::guard('client')->user();
            $toReturn=['client',$client];
            
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
        return 'NIJe';
        
        
    }
}
