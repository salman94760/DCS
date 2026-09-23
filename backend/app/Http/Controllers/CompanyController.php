<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    public function addCompany(Request $request){
        $path = '';
       
        if($request->hasFile('image')){
            $path = $request->file('image')->store('company','public');
        }



        $company = Company::create([
            'usdot'             => $request->usdot??'',
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

    public function company()
{
    $company = Company::all();

    return response()->json([
        'success' => true,
        'company' => $company,
    ], 200);
}
}
