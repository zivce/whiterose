<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Started_job extends Model
{
    //

    public function job()
    {
       return $this->belongsTo('App\Job');
    }

    public function pentester()
    {
       return $this->belongsTo('App\Pentester');
    }
}
