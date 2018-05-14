<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Job;


class DiscusionController extends Controller
{
    public function getMessages(Request $request)
    {
        $jobID=$request->jobID;
        $job=Job::where('id',1)->first();
        $discusion=$job->discusion()->first();
        return $discusion->messages()->get();

    }

    public function postMessage(Request $request)
    {
        
        $message=new Message;
        $message->text=$request->text;
        if(Auth::guard('client')->check())
            $message->clientToPentester=1;
        else
            $message->pentesterToClient=1;

        $message->discusion_id=$request->discusionID;
        $message->save();
        
    }
}
