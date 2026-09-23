<?php

namespace App\Models;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
#[Fillable(['user_id', 'address', 'phone', 'zipcode', 'landmark', 'password_hint','image','company','status'])]
class userInfo extends Model
{
     use HasFactory, Notifiable;
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}