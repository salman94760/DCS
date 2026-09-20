<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request){

    //     if (!$request->email) {
    //     return response()->json([
    //         'success' => false,
    //         'message' => 'Name is required'
    //     ], 400);
    // }

    // return response()->json([
    //     'success' => true,
    //     'message' => 'Form submitted successfully'
    // ], 200);



        
        $data = $request->all();
        return response()->json([
            'success' => true,
            'message' => 'Form submitted successfully',
            'data' => $data
        ]);
    }
}
