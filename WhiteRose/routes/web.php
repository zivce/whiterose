<?php

// use Symfony\Component\Routing\Route;
use App\Client;
use Illuminate\Support\Facades\Auth;


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


// $loggedIn = true;



// if($loggedIn)
//     Route::get('/',function(){
//         return view('home');
//     });
// else
//     Route::get('/', function () {
//         return view('lender');
//     });


Route::get('/lander',function(){
    return view('lender');
});
Auth::routes();

Route::get('/testlog',function(){
    Auth::guard('client')->logout();
});
Route::get('/',function(){
    
    if(Auth::guard('client')->check()||Auth::guard('pentester')->check())
    return view('home');

    return view('lender');
});
Route::get('getLoggedUser',function()
{
    if(Auth::guard('pentester')->user())
        return Auth::guard('pentester')->user();
        return Auth::guard('client')->user();
});


Route::get('/home', 'HomeController@home')->name('home');
Route::get('/client', 'HomeController@client')->name('client');
Route::get('/hacker', 'HomeController@hacker')->name('hacker');


//site verification
Route::get('getVerifiedSites','ClientController@verifiedSites');
Route::post('newsite','ClientController@addNewWebsite')->name('newsite');
Route::get('getkey/{site}','ClientController@downloadKey')->name('getkey');
Route::post('confirmed','ClientController@confirmSite')->name('confirm');
Route::get('getAllSites','ClientController@allSites');
//buying and selling tokens
Route::get('purchasetokens','ClientController@buyTokens')->name('purchasetokens');
Route::post('transaction','TransactionController@transferTokens')->name('transactions');
Route::post('payout','PentesterController@cashOutPentester')->name('payout'); //undone
Route::get('returntokens','Controller@returnTokens')->name('returntokens');

//upload avatar
Route::post('postAvatar','ClientController@uploadAvatar');
//Client posting a job
Route::post('postjob','ClientController@postJob')->name('postjob');

//Returnng all jobs to clients or pentester
Route::get('returnalljobs','Controller@allJobs')->name('returnalljobs');
Route::post('startedJobs','Controller@startedJobs')->name('startedJobs');
Route::post('finishedJobs','Controller@finishedJobs')->name('finishedJobs');

//Return posted jobs to client
Route::get('returnmyjobs','ClientController@myJobs')->name('returnmyjobs');
Route::post('returnmyjob','ClientController@myJob')->name('returnmyjob');//undonde

//Biding on job
Route::post('postbid','PentesterController@bidOnJob')->name('bid');

//View my bids
Route::post('viewbidsclient','ClientController@viewMyBiddedJobs')->name('viewbidsclient');
Route::post('viewbidspentester','PentesterController@viewMyBids')->name('viewbidspentester');

//Client loging register
Route::post('clientreg','ClientController@register')->name('clientreg');
Route::get('/confirmed/{token}','ClientController@verifyAccount')->name('confirmed');
Route::post('/clientlogin','ClientController@login')->name('clientlogin');
Route::get('clientlogout','ClientController@logout')->name('logout');

//Pentester loging register
Route::post('hackerreg','PentesterController@register')->name('hackerreg');
Route::get('/confirmed/{token}','PentesterController@verifyAccount')->name('confirmed');
Route::post('/hackerlogin','PentesterController@login')->name('hackerlogin');
Route::get('hackerlogout','PentesterController@logout')->name('logout');

//Scan
Route::post('scan','ClientController@scan')->name('scan');

//Download scan
Route::get('/download/{dir}/{fileName}','ClientController@downloadScan')->name('DownloadScan');

//Upload CV
Route::post('uploadCv','PentesterController@uploadCV')->name('uploadCv');
Route::post('postCv1','PentesterController@postCV')->name('postCv');
Route::post('postCv','PentesterController@postPentesterDetails')->name('postdeails');

//Accepting the bid/starting the job
Route::post('accept','ClientController@acceptTheBid')->name('accept');

//Message communication
Route::post('postMesaages','DiscusionController@postMessage');
Route::get('getMessages','DiscusionController@getMessages')->name('getMessages');
Route::get('getAllFirstMessages','DiscusionController@returnLastMessages');
// Route::group(['prefix' => 'client'], function () {
//   Route::get('/login', 'ClientAuth\LoginController@showLoginForm')->name('login');
//   Route::post('/login', 'ClientAuth\LoginController@login');
//   Route::post('/logout', 'ClientAuth\LoginController@logout')->name('logout');

//   Route::get('/register', 'ClientAuth\RegisterController@showRegistrationForm')->name('register');
//   Route::post('/register', 'ClientAuth\RegisterController@register');

//   Route::post('/password/email', 'ClientAuth\ForgotPasswordController@sendResetLinkEmail')->name('password.request');
//   Route::post('/password/reset', 'ClientAuth\ResetPasswordController@reset')->name('password.email');
//   Route::get('/password/reset', 'ClientAuth\ForgotPasswordController@showLinkRequestForm')->name('password.reset');
//   Route::get('/password/reset/{token}', 'ClientAuth\ResetPasswordController@showResetForm');
// });

// Route::group(['prefix' => 'pentester'], function () {
//   Route::get('/login', 'PentesterAuth\LoginController@showLoginForm')->name('login');
//   Route::post('/login', 'PentesterAuth\LoginController@login');
//   Route::post('/logout', 'PentesterAuth\LoginController@logout')->name('logout');

//   Route::get('/register', 'PentesterAuth\RegisterController@showRegistrationForm')->name('register');
//   Route::post('/register', 'PentesterAuth\RegisterController@register');

//   Route::post('/password/email', 'PentesterAuth\ForgotPasswordController@sendResetLinkEmail')->name('password.request');
//   Route::post('/password/reset', 'PentesterAuth\ResetPasswordController@reset')->name('password.email');
//   Route::get('/password/reset', 'PentesterAuth\ForgotPasswordController@showLinkRequestForm')->name('password.reset');
//   Route::get('/password/reset/{token}', 'PentesterAuth\ResetPasswordController@showResetForm');
// });
