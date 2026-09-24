<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

use App\Models\userInfo;
use Illuminate\Container\Attributes\Storage;

use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Gate;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email      = $request->email ?? '';
        $password   = $request->password ?? '';


        $user = User::where('email', $email)->first();
       
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Email does not exist.',
            ], 404);
        }

        if ($user->userInfo->status === 0) {
            if($user->role === 'admin'){
                $msg = "admin user not active contact Support .";
            }else if($user->role === 'manager'){
                $msg = "User not active contact Support .";
            }else if($user->role === 'employee'){
                $msg = "User not active contact Support .";
            }else if($user->role === 'company'){
                $msg = "User not active contact Support .";
            }else if($user->role === 'citation'){
                $msg = "User not active contact Support .";
            }
            return response()->json([
                'success' => false,
                'message' => $msg,
            ], 404);
        }
        
        if (!Hash::check($password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid password.',
            ], 401);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ], 200);
    }



public function addUser(Request $request)
{

    $request->validate([
        'fname' => 'required|string|max:255',
        'lname' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'company' => 'required|string|max:255',

        'phone' => [
            'required',
            'digits:10',
        ],

        'zipcode' => [
            'required',
            'digits:6',
        ],

        'role' => 'nullable|string',
        'status' => 'required|boolean',

        'address' => 'nullable|string',
        'landmark' => 'nullable|string',
        'image' => 'nullable|string',
    ]);

    // Random password
    $randomPassword = Str::password(
        8,
        letters: true,
        numbers: false,
        symbols: false
    );

    // Create user
    $user = User::create([
        'name' => $request->fname . ' ' . $request->lname,
        'email' => $request->email,

        // Password should be hashed
        'password' => Hash::make($randomPassword),

        'role' => $request->role ?? 'employee',
    ]);

    // Create user info
    if ($user) {
        $user->userInfo()->create([
            'address' => $request->address,
            'phone' => $request->phone,
            'zipcode' => $request->zipcode,
            'landmark' => $request->landmark,

            // Agar image upload nahi hai
            'image' => '',

            'company' => $request->company,

            // Hint plain text ho sakta hai agar user ko
            // temporary password batana hai
            'password_hint' => $randomPassword,

            'status' => $request->status,
        ]);
    }

    return response()->json([
        'success' => true,
        'message' => 'User added successfully.',
        'user' => $user,
    ], 200);
}

    

public function users()
{
    $users = User::with('userInfo')
        ->select([
            'id',
            'name',
            'email',
            'role',
            'created_at',
        ])
        ->get();

    return response()->json([
        'success' => true,
        'users' => $users,
    ], 200);
}
}
