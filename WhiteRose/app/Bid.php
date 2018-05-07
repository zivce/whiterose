<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    public function client()
    {
       return $this->belongsTo('App\Job');
    }
}
