<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CV extends Model
{
    //
    public function petester()
    {
       return $this->hasOne('App\Pentester');
    }
}
