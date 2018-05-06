<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Request;
use App\Pentester;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function returnTokens(Request $request)
    {
        if($request->role==='pentester')
            return Pentester::where('id',$request->id)->get()->tokens;
        return  Client::where('id',$request->id)->get()->tokens;
    }

    public function allJobs()
    {
        return Job::all();
    }

    
}
