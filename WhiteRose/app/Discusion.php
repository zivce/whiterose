<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Discusion extends Model
{
    //
    public function job()
    {
       return $this->hasOne('App\Job');
    }
    public function client()
    {
        return $this->hasOne('App\Client');
    }
    public function pentester()
    {
        return $this->hasOne('App\Pentester');
    }
    public function messages()
    {
        return $this->hasMany('App\Message');
    }
}
