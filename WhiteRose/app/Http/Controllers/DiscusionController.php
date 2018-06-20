<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Job;
use App\Discusion;
use Illuminate\Support\Facades\Auth;
use App\Client;
use App\Pentester;
use App\Message;
use Symfony\Component\HttpKernel\Log\Logger;



class DiscusionController extends Controller
{
    public function returnLastMessages()
    {
        $firstMessages=[];
        if(Auth::guard('client')->check()){
            $user=Client::where('id',Auth::guard('client')->user()->id)->first();          
        }else{
            $user=Pentester::where('id',Auth::guard('pentester')->user()->id)->first();
        }

     
        $discusions=$user->discusions()->get();
       //return $discusions;
        foreach($discusions as $disc)
        {
            if(Auth::guard('client')->check()){
                $avatar =  $disc->pentester()->first()->image_path;  
                $message = $disc->messages()->where('pentesterToClient',1)->latest()->first();   
            }else{
                $avatar =  $disc->client()->first()->image_path;  
                $message = $disc->messages()->where('clientToPentester',1)->latest()->first();                                      
            }
            
            $toArray=['message'=>$message,
                        'job_id'=>$disc->job_id,
                        'client_name'=>$disc->client()->first()->name,
                        'pentester_name'=>$disc->pentester()->first()->username,
                        'avatar'=>$avatar
                    ];
            array_push($firstMessages,$toArray);
            
            
        }
       return $firstMessages;

        
    }
    public function getMessages($jobID)
    {
        
        
        $job=Job::where('id',$jobID)->first();
        $discusion=$job->discusion()->where('job_id',$jobID)->first();
        $job_pivot = $job->pentesters()->where('pentesters_jobs.job_id',$jobID)->first()->pivot;
        $finished = $job_pivot->finished;
        $pentester=Pentester::where('id',$discusion->pentester_id)->first();    
        $client=Client::where('id',$discusion->client_id)->first();            

        if(!Auth::guard('pentester')->check())
        {

        
        $discusion->sender = $pentester;
        
        //$discusion = $discusion->with('messages')->get();
        $discusion->messages=$discusion->messages()->get();
        //$disc=array();
       // $disc[0]=$discusion;
       /// array_push($disc,$discusion);
        
        return $ret = [
            "discusion" => $discusion,
            "pentester" => $pentester->username,
            "finished"  => $finished,
            "completed" => $job->completed,
            "avatar" => $pentester->image_path,            
        ];
        }
        else{
             
        $discusion->sender = $client;
        
       // $discusion = $discusion->with('messages')->get();
       $discusion->messages=$discusion->messages()->get();
      // $disc=array();
      // $disc[0]=$discusion;

        return $ret = [
            "discusion" => $discusion,
            "client" => $client->username,
            "finished"  => $finished,
            "completed" => $job->completed,
            "avatar" => $client->image_path,                                          
        ];
        }
        



    }

    public function postMessage(Request $request)
    {
        $dis=Discusion::where('id',$request->discusionID)->first();
        $lastmessage=$dis->messages()->latest()->first();
        if(Auth::guard('client')->check())
        {
            if($lastmessage->clientToPentester===1)
            {
                $text=json_decode($lastmessage->text);
                // $text=$lastmessage->text;
                array_push($text,$request->message);
                $lastmessage->text = json_encode($text);
                $lastmessage->save();
            }
            else{
                $message=new Message;
                $text = array();
                array_push($text,$request->message);
                $message->text=json_encode($text);
            
                $message->clientToPentester=1;
        
                $message->discusion_id=$request->discusionID;
                $message->save();
            }
        }
        else
        {
            if($lastmessage->pentesterToClient===1)
            {
                $text=json_decode($lastmessage->text);
                array_push($text,$request->message);        
                $lastmessage->text = json_encode($text);
                $lastmessage->save();
            }
            else{
                $message=new Message;
                $text = array();
                array_push($text,$request->message);
                $message->text=json_encode($text);

                $message->pentesterToClient=1;
        
                $message->discusion_id=$request->discusionID;
                $message->save();
            }
        }
        
    }

    public function deleteDiscusion(Request $request)
    {
        $discusion = Discusion::where('id',$request->job_id)->first();
        return $discusion;
        $discusion->delete();
    }
}
