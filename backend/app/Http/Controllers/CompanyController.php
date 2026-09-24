<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

use App\Models\userInfo;
use Illuminate\Container\Attributes\Storage;

use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Gate;

class CompanyController extends Controller
{
    public function addCompany(Request $request){
$request->validate([
    'email' => 'required|email|unique:companies,email',

    'dot' => 'required|digits:7|unique:companies,dot',

    'mc' => 'required|digits:7|unique:companies,mc',

    'ein' => 'required|digits:9|unique:companies,ein',
]);


        $path = '';
        $randomPassword = Str::password(8,letters: true,numbers: false,symbols: false);
        $user = User::create([
            'name'      => $request->owner,
            'email'     => $request->email,
            'password'  => Hash::make($randomPassword),
            'role'      => 'company',
        ]);

        if ($user) {
            $user->userInfo()->create([
                'address'       => $request->physicaladdress??'',
                'phone'         => $request->phone,
                'zipcode'       => '',
                'landmark'      => '',
                'image'         => '',
                'company'       => $request->cname??'',
                'password_hint' => $randomPassword,
                'status'        => $request->status,
            ]);
        }

        if($request->hasFile('image')){
            $path = $request->file('image')->store('company','public');
        }

        $company = Company::create([
            'usdot'             => $request->usdot??'',
            'user_id'             => $user->id,
            'owner'             => $request->owner??'',
            'cname'             => $request->cname??'',
            'dot'               => $request->dot,
            'mc'                => $request->mc,
            'ein'               => $request->ein,
            'dba'               => $request->dba??'',
            'email'             => $request->email,
            'phone'             => $request->phone,
            'aphone'            => $request->aphone??'',
            'physicaladdress'   => $request->physicaladdress??'',
            'mailaddress'       => $request->mailaddress??'',
            'image'             => $path   
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Company added successfully.',
            'user' => $company,
        ], 200);
    }

    public function company(){
        $companies = Company::with('user.userInfo')->get();
        return response()->json([
            'success' => true,
            'companies' => $companies,
        ], 200);
    }

    public function companyDetail($id){
        $company = Company::with('user.userInfo')->find($id);
        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'company' => $company,
        ]);
    }

    public function updateCompany(Request $request, String $id){
        $company = Company::findOrFail($id);
        $user = User::findOrFail($company->user_id);
        
        $user->update(['name'  => $request->owner,'email' => $request->email]);
        
        $user->userInfo()->updateOrCreate(['user_id' => $user->id],
            [
                'address' => $request->physicaladdress ?? '',
                'phone' => $request->phone ?? '',
                'company' => $request->cname ?? '',
                'status' => $request->status ?? '',
            ]
        );

        $path = $company->image;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('company', 'public');
        }

        $company->update([
            'usdot'           => $request->usdot ?? '',
            'owner'           => $request->owner ?? '',
            'cname'           => $request->cname ?? '',
            'dot'             => $request->dot ?? '',
            'mc'              => $request->mc ?? '',
            'ein'             => $request->ein ?? '',
            'dba'             => $request->dba ?? '',
            'email'           => $request->email ?? '',
            'phone'           => $request->phone ?? '',
            'aphone'          => $request->aphone ?? '',
            'physicaladdress' => $request->physicaladdress ?? '',
            'mailaddress'     => $request->mailaddress ?? '',
            'image'           => $path,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Company updated successfully.',
            'company' => $company->load('user.userInfo'),
        ], 200);
    }

    public function deleteCompany(String $id){
        $company = Company::findOrFail($id);
        $user_id = $company->user_id;
        
        $user = User::findOrFail($user_id);
        $user->userInfo()->delete();
        $user->delete();
        $company->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Company deleted successfully.',
        ], 200); 
    }
}
