<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function pentester()
    {
        return $this->belongsTo('App\Pentester');
    }
}
