<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    //
    public function client()
    {
       return $this->belongsTo('App\Client');
    }

    public function jobHistory()
    {
       return $this->hasOne('App\Job_history');
    }

    public function pentesters()
    {
       return $this->belongsToMany('App\Pentester','pentesters_jobs')
                    ->withPivot('amount','started','finished')
                    ->withTimestamps();
    }

    public function bids()
    {
       return $this->hasMany('App\Bid');
    }
    public function discusion()
    {
       return $this->hasOne('App\Discusion');
    }
}
