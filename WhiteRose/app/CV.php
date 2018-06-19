<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CV extends Model
{
    //
    public function pentester()
    {
       return $this->belongsTo('App\Pentester');
    }
}
