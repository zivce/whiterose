<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //

    public function client()
    {
        return $this->hasOne('App\Client');

    }

    public function pentester()
    {
        return $this->hasOne('App\Pentester');

    }
}
