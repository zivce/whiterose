<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Website extends Model
{
    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    public function scans()
    {
        return $this->hasMany('App\Scan');
    }

}
