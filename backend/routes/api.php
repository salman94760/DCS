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
Route::get('/admin/company', [CompanyController::class, 'company']);
Route::get('/admin/company/{id}', [CompanyController::class, 'companyDetail']);
Route::post('/admin/company/add', [CompanyController::class, 'addCompany']);
Route::put('/admin/company/edit/{id}', [CompanyController::class, 'updateCompany']);
Route::delete('/admin/company/delete/{id}', [CompanyController::class, 'deleteCompany']);