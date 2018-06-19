<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client as Client;
use App\Pentester as Pentester;
use App\Job as Job;
use App\Question as Question;
use Illuminate\Support\Facades\Auth;


class AdminController extends Controller
{
    public function editQuestion(Request $request)
    {
        $question=Question::where('id',$request->question['id'])->first();
        $question->question=$request->question['question'];
        $question->answ1=$request->question['answ1'];
        $question->answ2=$request->question['answ2'];
        $question->answ3=$request->question['answ3'];
        $question->answ4=$request->question['answ4'];
        $question->corransw=$request->question['corransw'];
        $question->save();
        
    }
    public function login(Request $request)
    {
        
        $email=$request->email;
        $password=$request->pw;
       
            
            if(Auth::attempt(['email'=>$email,'password'=>$password]))
            {
            
               return 'Logged in!';
                
            }
            else
            {
            
                return 'Wrong username or password';
                    
            }
       
      return 'User does not exist';
    }
    public function adminLogout()
    {
        // if(Auth::check())
        // return 'Ulogovan';
        // else 
        // return 'NIje';
       Auth::logout();
    }
    public function getAllUsers()
    {
        $clients = Client::all();
        $pentesters = Pentester::all();
        $users = $clients->merge($pentesters);
        $arr_users = array();
        array_push($arr_users,$clients);
        array_push($arr_users,$pentesters);

        return $arr_users;

    }

    public function banUser(Request $request)
    {
        if($request->role==="client"){
            $user = Client::where('id',$request->id)->first();
            $user->confirmed = 0;
            return "Client successfully banned!";
        }else{
            $user = Pentester::where('id',$request->id)->first();
            $user->confirmed = 0;
            return "Pentester successfully banned!";            
        }
    }

    public function getAllJobs()
    {
        $jobs = Job::all();
        foreach($jobs as $job){
            $client = $job->client()->first();
            $job->client = $client;
        }
        return $jobs->sortBy('created_at');
    }

    public function getAllQuestions()
    {
        $questions = Question::all();
        return $questions;
        // return $questions->sortBy('updated_at');
    }
}
