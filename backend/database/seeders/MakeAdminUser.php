<?php

namespace Database\Seeders;
use App\Models\User;
use App\Models\userInfo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class MakeAdminUser extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Admin',
            'email' => 'info@dotsafe.net',
            'role' =>'admin'
            'email_verified_at' => now(),
            'password' => Hash::make('Stockton@2027'),
            'remember_token' =>  Str::random(10)
        ]);

        if ($user->id) {
            userInfo::create([
                'user_id' => $user->id,
                'address' => 'XXXXXX',
                'phone' => 'XXXXXX',
                'zipcode' => 'XXXXXX',
                'landmark' => 'XXXXXX',
                'password_hint' => 'XXXXXX'
            ]);
        }
    }
}
