<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$loggedIn = true;

if($loggedIn)
    Route::get('/',function(){
        return view('home');
    });
else
    Route::get('/', function () {
        return view('lender');
    });

Auth::routes();


Route::post('login','Auth\LoginController@postLogin')->name('login');

Route::get('/home', 'HomeController@home')->name('home');
Route::get('/client', 'HomeController@client')->name('client');
Route::get('/hacker', 'HomeController@hacker')->name('hacker');


//site verification
Route::get('newsite','ClientController@addNewWebsite')->name('newsite');
Route::get('getkey','ClientController@downloadKey')->name('getkey');
Route::get('confirm','ClientController@confirmSite')->name('confirm');

//buying and selling tokens
Route::get('purchasetokens','ClientController@buyTokens')->name('purchasetokens');
Route::post('transaction','TransactionController@transferTokens')->name('transactions');
Route::post('payout','PentesterController@cashOutPentester')->name('payout'); //undone
Route::get('returntokens','Controller@returnTokens')->name('returntokens');


//Client posting a job
Route::post('postjob','ClientController@postJob')->name('postjob');

//Returnng all jobs to clients or pentester
Route::post('returnalljobs','Controller@allJobs')->name('returnalljobs');

//Return posted jobs to client
Route::post('returnmyjobs','ClientController@myJobs')->name('returnmyjobs');


