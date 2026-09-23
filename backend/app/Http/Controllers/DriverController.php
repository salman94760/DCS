<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Browsershot\Browsershot;
// use Barryvdh\DomPDF\Facade\Pdf;
use Spatie\LaravelPdf\Support\Pdf;

class DriverController extends Controller
{
    public function genPdf(){
        $html = view('drivers.driver-application', [
        'name' => 'John Doe',
        'amount' => 1500,
    ])->render();

    Browsershot::html($html)
        ->format('A4')
        ->savePdf(storage_path('app/invoice.pdf'));

    return response()->download(
        storage_path('app/invoice.pdf')
    );
    }

    public function generatePdf()
{
    return Pdf('drivers.driver-application', [
            'invoiceNumber' => '1234',
            'customerName' => 'Grumpy Cat',
        ]); 
    $data = [
        'name' => 'John Doe',
        'amount' => 1500,
    ];

    $pdf = Pdf::loadView('drivers.driver-application', $data);
  
    $path = storage_path('app/invoice.pdf');
  
    $pdf->save($path);

    return response()->download($path);
}
}
