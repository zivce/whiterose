<?php

Route::get('/home', function () {
    $users[] = Auth::user();
    $users[] = Auth::guard()->user();
    $users[] = Auth::guard('client')->user();

    //dd($users);

    return view('client.home');
})->name('home');

