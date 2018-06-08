<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Request;
use App\Pentester;
use App\Job;
use Illuminate\Support\Facades\Auth;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function returnTokens(Request $request)
    {
        if(Auth::guard('pentester')->check())
            return Pentester::where('id',Auth::guard('pentester')->user()->id)
                              ->first()
                              ->tokens;
        return  Client::where('id',Auth::guard('client')->user()->id)
                        ->first()
                        ->tokens;
    }

    public function allJobs()
    {
        // return Job::all()
        //             ->sortBy('created_at');
        $jobs = Job::all();
        foreach($jobs as $job){
            $client = $job->client()->first();
            $job->client = $client;
        }
        return $jobs->sortBy('created_at');
    }

    
}
