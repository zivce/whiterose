<?php

namespace App\Http\Controllers;

use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Website;
use App\Client;
use Illuminate\Support\Facades\Redirect;
use App\Job;



class ClientController extends Controller
{
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


}
