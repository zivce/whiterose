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

    public function startedJob()
    {
       return $this->hasOne('App\Started_job');
    }
}
