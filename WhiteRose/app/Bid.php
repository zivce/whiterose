<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    
    public function pentester()
    {
       return $this->belongsTo('App\Pentester');
    }

    public function job()
    {
       return $this->belongsTo('App\job');
    }
}
