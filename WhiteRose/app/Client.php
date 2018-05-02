<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    //
    public function messages()
    {
        return $this->hasMany('App\Mesasge');
    }

    public function jobs()
    {
        return $this->hasMany('App\Job');
    }
}
