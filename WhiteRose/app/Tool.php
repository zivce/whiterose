<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    public function admin()
    {
       return $this->hasOne('App\Admin');
    }
}
