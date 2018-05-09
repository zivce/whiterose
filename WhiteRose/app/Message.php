<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //

    public function discusion()
    {
        return $this->belongsTo('App\Discusion');

    }

}
