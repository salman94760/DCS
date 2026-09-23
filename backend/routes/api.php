<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/users/add', [AuthController::class, 'addUser']);
Route::get('/admin/users', [AuthController::class, 'users']);
Route::post('/admin/company/add', [CompanyController::class, 'addCompany']);
Route::get('/admin/company', [CompanyController::class, 'company']);