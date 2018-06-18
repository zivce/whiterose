<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
    public function login(Request $request)
    {
        
        $email=$request->email;
        $password=$request->pw;
        $client=Client::where('email',$email)->first();
        if($client->email === "admin@whiterose.com")
        {
            // if($client->confirmed==0)
            // {
            //     return 'Please verify your account';
            // }
            
            if(Auth::guard('client')->attempt(['email'=>$email,'password'=>$password]))
            {
            
                $client=Auth::guard('client')->user();
                if($client->image_path===null){
                    $avatar = 'public\uploads\images\avatar_client.png';
                }else{
                    $avatar = $client->image_path;
                }
                $toReturn=['role'=>'client',
                            'id'=>$client->id,
                            'name'=>$client->name,
                            'email'=>$client->email,
                            'username'=>$client->username,
                            'lastname'=>$client->lastname,
                            'tokens'=>$client->tokens,
                            'avatar'=>$avatar,

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
}
