<?php

use App\Http\Controllers\DriverController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('driver-application',function (){
    return view('drivers.driver-application');
});

Route::get('genPdf',[DriverController::class,'genPdf']);
Route::get('generatePdf',[DriverController::class,'generatePdf']);
