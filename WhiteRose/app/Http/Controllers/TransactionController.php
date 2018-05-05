<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;
use App\Pentester;

class TransactionController extends Controller
{
    //
    public function transferTokens(Request $request)
    {
        $clientID=$request->clientID;
        $pentesterID=$request->pentesterID;
        $domainName=$request->domainName;
     
        $transaction=Transaction::where('client_id',$clientID)
                    ->where('pentester_id',$pentesterID)
                    ->where('domain_name',$domainName)
                    ->get();
        

        $amount=$transaction->amount;
        $pentester=Pentester::where('id',1)->first();
        $pentester->tokens=$pentester->tokens+$amount;
        $pentester->save();
       
        $transaction=Transaction::where('cliend_id',$clientID)
                    ->where('pentester_id',$pentesterID)
                    ->where('domain_name',$domainName)
                    ->delete();
    }
}
