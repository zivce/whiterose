<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Job;
use App\Discusion;
use Illuminate\Support\Facades\Auth;
use App\Client;
use App\Pentester;
use App\Message;



class DiscusionController extends Controller
{
    public function returnLastMessages()
    {
        $firstMessages=[];
        if(Auth::guard('client')->check())
         $user=Client::where('id',Auth::guard('client')->user()->id)->first();
        else 
        $user=Pentester::where('id',Auth::guard('pentester')->user()->id)->first();

     
        $discusions=$user->discusions()->get();
       //return $discusions;
        foreach($discusions as $disc)
        {
            
            
            $toArray=['message'=>$disc->messages()->orderBy('created_at')->first(),
                        'job_id'=>$disc->job_id,
                        'client_name'=>$disc->client()->first()->name,
                        'pentester_name'=>$disc->pentester()->first()->name];
            array_push($firstMessages,$toArray);
            
            
        }
       return $firstMessages;

        
    }
    public function getMessages(Request $request)
    {
        $jobID=$request->jobID;
        $job=Job::where('id',1)->first();
        $discusion=$job->discusion()->first();
        $pentester=Pentester::where('id',$discusion->pentester_id)->first()->username;
        $discusion->sender = $pentester;
        // return $discusion->messages()->get();
        $discusion = $discusion->with('messages')->get();

        return $ret = [
            "discusion" => $discusion,
            "pentester" => $pentester
        ];



    }

    public function postMessage(Request $request)
    {
        if(Auth::guard('client')->check())
        {
            $dis=Discusion::where('id',$request->discusionID)->first();
            $lastmessage=$dis->messages()->latest()->first();
            if($lastmessage->clientToPentester===1)
            {
                $text=json_decode($lastmessage->text);
                array_push($text,$request->message);
                $text->save();
            }
            else{
                $message=new Message;
                $message->text=$request->message;
               
                    $message->clientToPentester=1;
               
                   
        
                $message->discusion_id=$request->discusionID;
                $message->save();
            }
        }
        else
        {
            $dis=Discusion::where('id',$request->discusionID)->first();
            $lastmessage=$dis->messages()->latest()->first();
            if($lastmessage->pentesterToClient===1)
            {
                $text=json_decode($lastmessage->text);
                array_push($text,$request->message);
                $text->save();
            }
            else{
                $message=new Message;
                $message->text=$request->message;
                
                    
                
                $message->pentesterToClient=1;
        
                $message->discusion_id=$request->discusionID;
                $message->save();
            }
        }
        
        e();
        
    }
}
