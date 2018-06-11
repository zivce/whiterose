<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Scan extends Model
{
    //
    public function website()
    {
        return $this->belongsTo('App\Website');
    }
}
