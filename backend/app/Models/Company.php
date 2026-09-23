<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public $fillable = [
        'usdot',
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
}
