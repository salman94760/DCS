<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Company extends Model
{
    public $fillable = [
        'usdot',
        'user_id',
        'owner',
        'cname',
        'dot',
        'mc',
        'ein',
        'dba',
        'email',
        'phone',
        'aphone',
        'physicaladdress',
        'mailaddress',
        'image'
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
}
