<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Started_job extends Model
{
    //

    public function job()
    {
       return $this->hasOne('App\Job');
    }

    public function pentester()
    {
       return $this->hasOne('App\Pentester');
    }
}
