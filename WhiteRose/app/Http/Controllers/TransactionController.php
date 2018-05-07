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
       $bidID=$request->bidID;
       $bid=Bid::where('id',$bidID)->first();
       $client=Client::where('id',$bid->client_id)->first();
       $pentester=Pentester::where('id',$bid->pentester_id)->first();

       $client->tokens=$client->tokens-$bid->amount;
       $client->reservedTokens=$client->reservedTokens-$bid->amount;

       $pentester->tokens=$pentester->tokens+$bid->amount;

       $transaction=new Transaction;
       $transaction->client_id=$bid->client_id;
       $transaction->pentester_id=$bid->pentester_id;
       $transaction->amount=$bid->amount;
       $transaction->job_id=$bid->job_id;

       $client->save();
       $pentester->save();
       $transaction->save();
      
       

       

    }
}
