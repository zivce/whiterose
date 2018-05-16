<?php

namespace App;

use App\Notifications\ClientResetPassword;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Client extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ClientResetPassword($token));
    }

    public function messages()
    {
        return $this->hasMany('App\Mesasge');
    }

    public function jobs()
    {
        return $this->hasMany('App\Job');
    }

    public function websites()
    {
        return $this->hasMany('App\Website');
    }

    public function discusions()
    {
        return $this->hasMany('App\Discusion');
    }
 
}
