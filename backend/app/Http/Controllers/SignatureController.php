<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class SignatureController extends Controller
{
    public function save(Request $request)
    {
        $request->validate([
            'signature' => 'required|string',
        ]);

        $signature = $request->signature;
        $userId = $request->userId;

        // Base64 prefix remove karo
        $signature = preg_replace(
            '/^data:image\/\w+;base64,/',
            '',
            $signature
        );

        $signature = str_replace(' ', '+', $signature);

        $image = base64_decode($signature);

        $fileName = 'signatures/' . uniqid() . '.png';

        Storage::disk('public')->put($fileName, $image);


        $user = user::findOrFail($userId);
        $user->update([
            'signature' => $fileName,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Signature saved successfully.',
            'signature' => $fileName,
        ]);
    }
}