<?php

namespace App\Http\Controllers;

use App\Mail\ObReportMail;
use App\Models\ObReport;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Branch;
use App\Models\User;
use App\Models\UserBranch;
use App\utils\helpers;
use Carbon\Carbon;
use Twilio\Rest\Client as Client_Twilio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use \Nwidart\Modules\Facades\Module;
use App\Models\sms_gateway;
use DB;
use PDF;

class ObReportsController extends Controller
{
    //---------------- GET ALL ObReports ---------------\\
    public function index(request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', ObReport::class);
        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');

        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();
        // Filter fields With Params to retrieve
        $param = array(
            0 => 'like',
            // 1 => 'like',
            1 => 'like',
            2 => '=',
            // 4 => '=',
        );
        $columns = array(
            0 => 'Ref',
            // 1 => 'statut',
            1 => 'client_name',
            2 => 'date',
            // 4 => 'warehouse_id',
        );
        $data = array();

        // Check If User Has Permission View  All Records
        $ObReports = ObReport::where('deleted_at', '=', null)
            ->where(function ($query) use ($view_records) {
                if (!$view_records) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            });

        //Multiple Filter
        $Filtred = $helpers->filter($ObReports, $columns, $param, $request)
        //Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('client_name', 'LIKE', "%{$request->search}%");
                        // ->orWhere('GrandTotal', $request->search);
                        // ->orWhere(function ($query) use ($request) {
                        //     return $query->whereHas('client', function ($q) use ($request) {
                        //         $q->where('name', 'LIKE', "%{$request->search}%");
                        //     });
                        // })
                        // ->orWhere(function ($query) use ($request) {
                        //     return $query->whereHas('warehouse', function ($q) use ($request) {
                        //         $q->where('name', 'LIKE', "%{$request->search}%");
                        //     });
                        // });
                });
            });

        $totalRows = $Filtred->count();
        if($perPage == "-1"){
            $perPage = $totalRows;
        }
        $ObReports = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($ObReports as $ObReport) {

            $item['id'] = $ObReport->id;
            $item['date'] = $ObReport->date;
            $item['Ref'] = $ObReport->Ref;
            $item['phone'] = $ObReport->phone;
            $item['client_name'] = $ObReport->client_name;
            $item['reporter_name'] = $ObReport->reporter_name;
            $item['reporter_id'] = $ObReport->reporter_id;
            $item['notes'] = $ObReport->notes;
            $item['subject'] = $ObReport->subject;

            $data[] = $item;
        }

        // $customers = client::where('deleted_at', '=', null)->get();

        //get warehouses assigned to user
        // $user_auth = auth()->user();
        // if($user_auth->is_all_warehouses){
        //     $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        // }else{
        //     $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
        //     $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        // }

        return response()->json([
            'totalRows' => $totalRows,
            'ObReports' => $data,
            // 'customers' => $customers,
            // 'warehouses' => $warehouses,
        ]);
    }

    //------------ Store new ObReport -------------\\

    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', ObReport::class);

        request()->validate([
            // 'client_name' => 'required',
            // 'warehouse_id' => 'required',
        ]);

        \DB::transaction(function () use ($request) {

            $order = new ObReport;

            $order->date = $request->date;
            $order->Ref = $this->getNumberOrder();
            // $order->statut = $request->statut;
            $order->client_name = $request->client_name;
            $order->subject = $request->subject;
            $order->reporter_name = $request->reporter_name;
            $order->reporter_id = $request->reporter_id;
            $order->phone = $request->phone;
            $order->notes = $request->notes;
            $order->user_id = Auth::user()->id;

            $order->save();

        }, 10);
        return response()->json(['success' => true]);
    }

    //------------ Update ObReport -------------\\

    // public function update(Request $request, $id)
    // {
    //     $this->authorizeForUser($request->user('api'), 'update', ObReport::class);

    //     request()->validate([
    //         'warehouse_id' => 'required',
    //         'client_id' => 'required',
    //     ]);

    //     \DB::transaction(function () use ($request, $id) {
    //         $role = Auth::user()->roles()->first();
    //         $view_records = Role::findOrFail($role->id)->inRole('record_view');
    //         $current_ObReport = ObReport::findOrFail($id);

    //         // Check If User Has Permission view All Records
    //         if (!$view_records) {
    //             // Check If User->id === ObReport->id
    //             $this->authorizeForUser($request->user('api'), 'check_record', $current_ObReport);
    //         }

    //         $old_ObReport_details = ObReportDetail::where('ObReport_id', $id)->get();
    //         $new_ObReport_details = $request['details'];
    //         $length = sizeof($new_ObReport_details);

    //         // Get Ids details
    //         $new_details_id = [];
    //         foreach ($new_ObReport_details as $new_detail) {
    //             $new_details_id[] = $new_detail['id'];
    //         }

    //         // Init ObReport with old Parametre
    //         $old_detail_id = [];
    //         foreach ($old_ObReport_details as $key => $value) {
    //             $old_detail_id[] = $value->id;

    //             // Delete Detail
    //             if (!in_array($old_detail_id[$key], $new_details_id)) {
    //                 $ObReportDetail = ObReportDetail::findOrFail($value->id);
    //                 $ObReportDetail->delete();
    //             }

    //         }

    //         // Update ObReport with New request
    //         foreach ($new_ObReport_details as $key => $product_detail) {

    //             $QuoteDetail['ObReport_id'] = $id;
    //             $QuoteDetail['quantity'] = $product_detail['quantity'];
    //             $QuoteDetail['sale_unit_id'] = $product_detail['sale_unit_id'];
    //             $QuoteDetail['product_id'] = $product_detail['product_id'];
    //             $QuoteDetail['product_variant_id'] = $product_detail['product_variant_id'];
    //             $QuoteDetail['price'] = $product_detail['Unit_price'];
    //             $QuoteDetail['TaxNet'] = $product_detail['tax_percent'];
    //             $QuoteDetail['tax_method'] = $product_detail['tax_method'];
    //             $QuoteDetail['discount'] = $product_detail['discount'];
    //             $QuoteDetail['discount_method'] = $product_detail['discount_Method'];
    //             $QuoteDetail['total'] = $product_detail['subtotal'];
    //             $QuoteDetail['imei_number'] = $product_detail['imei_number'];

    //             if (!in_array($product_detail['id'], $old_detail_id)) {
    //                 ObReportDetail::Create($QuoteDetail);
    //             } else {
    //                 ObReportDetail::where('id', $product_detail['id'])->update($QuoteDetail);
    //             }
    //         }

    //         $current_ObReport->update([
    //             'client_id' => $request['client_id'],
    //             'warehouse_id' => $request['warehouse_id'],
    //             'statut' => $request['statut'],
    //             'notes' => $request['notes'],
    //             'tax_rate' => $request['tax_rate'],
    //             'TaxNet' => $request['TaxNet'],
    //             'date' => $request['date'],
    //             'discount' => $request['discount'],
    //             'shipping' => $request['shipping'],
    //             'GrandTotal' => $request['GrandTotal'],
    //         ]);

    //     }, 10);

    //     return response()->json(['success' => true]);
    // }

    //------------ Delete ObReport -------------\\

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', ObReport::class);

        \DB::transaction(function () use ($id, $request) {

            $role = Auth::user()->roles()->first();
            $view_records = Role::findOrFail($role->id)->inRole('record_view');
            $ObReport = ObReport::findOrFail($id);

            // Check If User Has Permission view All Records
            if (!$view_records) {
                // Check If User->id === ObReport->id
                $this->authorizeForUser($request->user('api'), 'check_record', $ObReport);
            }
            $ObReport->details()->delete();
            $ObReport->update([
                'deleted_at' => Carbon::now(),
            ]);

        }, 10);

        return response()->json(['success' => true]);
    }

    //-------------- Delete by selection  ---------------\\

    public function delete_by_selection(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'delete', ObReport::class);

        \DB::transaction(function () use ($request) {

            $role = Auth::user()->roles()->first();
            $view_records = Role::findOrFail($role->id)->inRole('record_view');
            $selectedIds = $request->selectedIds;
            foreach ($selectedIds as $ObReport_id) {
                $ObReport = ObReport::findOrFail($ObReport_id);

                // Check If User Has Permission view All Records
                if (!$view_records) {
                    // Check If User->id === ObReport->id
                    $this->authorizeForUser($request->user('api'), 'check_record', $ObReport);
                }
                $ObReport->details()->delete();
                $ObReport->update([
                    'deleted_at' => Carbon::now(),
                ]);
            }

        }, 10);

        return response()->json(['success' => true]);
    }

    //------------- Send ObReport on Email -----------\\

    public function SendEmail(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'view', ObReport::class);

        $quote['id'] = $request->id;
        $quote['Ref'] = $request->Ref;
        $settings = Setting::where('deleted_at', '=', null)->first();
        $quote['company_name'] = $settings->CompanyName;

        $pdf = $this->ObReport_pdf($request, $quote['id']);
        $this->Set_config_mail(); // Set_config_mail => BaseController
        $mail = Mail::to($request->to)->send(new ObReportMail($quote, $pdf));
        return $mail;
    }


    //---------------- Get Details ObReport-----------------\\

    public function show(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'view', ObReport::class);
        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');
        $ObReport_data = ObReport::where('deleted_at', '=', null)
            ->findOrFail($id);

        $details = array();

        // Check If User Has Permission view All Records
        if (!$view_records) {
            // Check If User->id === ObReport->id
            $this->authorizeForUser($request->user('api'), 'check_record', $ObReport_data);
        }

        $quote['Ref'] = $ObReport_data->Ref;
        $quote['date'] = $ObReport_data->date;
        $quote['note'] = $ObReport_data->notes;
        $quote['client_name'] = $ObReport_data->client_name;
        $quote['reporter_name'] = $ObReport_data->reporter_name;
        $quote['reporter_id'] = $ObReport_data->reporter_id;
        $quote['subject'] = $ObReport_data->subject;
        $quote['phone'] = $ObReport_data->phone;
        // $quote['client_name'] = $ObReport_data['client']->name;
        // $quote['client_phone'] = $ObReport_data['client']->phone;
        // $quote['client_adr'] = $ObReport_data['client']->adresse;
        // $quote['client_email'] = $ObReport_data['client']->email;
        // $quote['client_tax'] = $ObReport_data['client']->tax_number;
        // $quote['warehouse'] = $ObReport_data['warehouse']->name;
        // $quote['GrandTotal'] = number_format($ObReport_data['GrandTotal'], 2, '.', '');

        // foreach ($ObReport_data['details'] as $detail) {

        //      //check if detail has sale_unit_id Or Null
        //      if($detail->sale_unit_id !== null){
        //         $unit = Unit::where('id', $detail->sale_unit_id)->first();
        //     }else{
        //         $product_unit_sale_id = Product::with('unitSale')
        //         ->where('id', $detail->product_id)
        //         ->first();
        //         $unit = Unit::where('id', $product_unit_sale_id['unitSale']->id)->first();
        //     }

        //     if ($detail->product_variant_id) {

        //         $productsVariants = ProductVariant::where('product_id', $detail->product_id)
        //             ->where('id', $detail->product_variant_id)->first();

        //         $data['code'] = $productsVariants->name . '-' . $detail['product']['code'];

        //     } else {
        //         $data['code'] = $detail['product']['code'];
        //     }

        //     $data['quantity'] = $detail->quantity;
        //     $data['total'] = $detail->total;
        //     $data['name'] = $detail['product']['name'];
        //     $data['price'] = $detail->price;
        //     $data['unit_sale'] = $unit->ShortName;

        //     if ($detail->discount_method == '2') {
        //         $data['DiscountNet'] = $detail->discount;
        //     } else {
        //         $data['DiscountNet'] = $detail->price * $detail->discount / 100;
        //     }

        //     $tax_price = $detail->TaxNet * (($detail->price - $data['DiscountNet']) / 100);
        //     $data['Unit_price'] = $detail->price;
        //     $data['discount'] = $detail->discount;

        //     if ($detail->tax_method == '1') {
        //         $data['Net_price'] = $detail->price - $data['DiscountNet'];
        //         $data['taxe'] = $tax_price;
        //     } else {
        //         $data['Net_price'] = ($detail->price - $data['DiscountNet']) / (($detail->TaxNet / 100) + 1);
        //         $data['taxe'] = $detail->price - $data['Net_price'] - $data['DiscountNet'];
        //     }

        //     $data['is_imei'] = $detail['product']['is_imei'];
        //     $data['imei_number'] = $detail->imei_number;

        //     $details[] = $data;
        // }

        $company = Setting::where('deleted_at', '=', null)->first();

        return response()->json([
            'quote' => $quote,
            // 'details' => $details,
            'company' => $company,
        ]);

    }

    //---------------- Reference Number Of ObReport  ---------------\\

    public function getNumberOrder()
    {
        $last = DB::table('ObReports')->latest('id')->first();

        if ($last) {
            $item = $last->Ref;
            $nwMsg = explode("_", $item);
            $inMsg = $nwMsg[1] + 1;
            $code = $nwMsg[0] . '_' . $inMsg;
        } else {
            $code = 'OB_1111';
        }
        return $code;

    }

    //---------------- ObReport PDF ---------------\\

    public function ObReport_pdf(Request $request, $id)
    {

        $details = array();
        $helpers = new helpers();
        $ObReport = ObReport::where('deleted_at', '=', null)
            ->findOrFail($id);

        $quote['client_name'] = $ObReport->client_name;
        $quote['phone'] = $ObReport->phone;
        $quote['reporter_name'] = $ObReport->reporter_name;
        $quote['reporter_id'] = $ObReport->reporter_id;
        $quote['subject'] = $ObReport->subject;
        $quote['note'] = $ObReport->notes;
        $quote['Ref'] = $ObReport->Ref;
        $quote['date'] = $ObReport->date;
        // $quote['GrandTotal'] = number_format($ObReport->GrandTotal, 2, '.', '');

        // $detail_id = 0;
        // foreach ($ObReport['details'] as $detail) {

        //     //check if detail has sale_unit_id Or Null
        //      if($detail->sale_unit_id !== null){
        //         $unit = Unit::where('id', $detail->sale_unit_id)->first();
        //     }else{
        //         $product_unit_sale_id = Product::with('unitSale')
        //         ->where('id', $detail->product_id)
        //         ->first();
        //         $unit = Unit::where('id', $product_unit_sale_id['unitSale']->id)->first();
        //     }

        //     if ($detail->product_variant_id) {

        //         $productsVariants = ProductVariant::where('product_id', $detail->product_id)
        //             ->where('id', $detail->product_variant_id)->first();

        //         $data['code'] = $productsVariants->name . '-' . $detail['product']['code'];
        //     } else {
        //         $data['code'] = $detail['product']['code'];
        //     }

        //         $data['detail_id'] = $detail_id += 1;
        //         $data['quantity'] = number_format($detail->quantity, 2, '.', '');
        //         $data['total'] = number_format($detail->total, 2, '.', '');
        //         $data['name'] = $detail['product']['name'];
        //         $data['unitSale'] = $unit->ShortName;
        //         $data['price'] = number_format($detail->price, 2, '.', '');

        //     if ($detail->discount_method == '2') {
        //         $data['DiscountNet'] = number_format($detail->discount, 2, '.', '');
        //     } else {
        //         $data['DiscountNet'] = number_format($detail->price * $detail->discount / 100, 2, '.', '');
        //     }

        //     $tax_price = $detail->TaxNet * (($detail->price - $data['DiscountNet']) / 100);
        //     $data['Unit_price'] = number_format($detail->price, 2, '.', '');
        //     $data['discount'] = number_format($detail->discount, 2, '.', '');

        //     if ($detail->tax_method == '1') {
        //         $data['Net_price'] = $detail->price - $data['DiscountNet'];
        //         $data['taxe'] = number_format($tax_price, 2, '.', '');
        //     } else {
        //         $data['Net_price'] = ($detail->price - $data['DiscountNet']) / (($detail->TaxNet / 100) + 1);
        //         $data['taxe'] = number_format($detail->price - $data['Net_price'] - $data['DiscountNet'], 2, '.', '');
        //     }

        //     $data['is_imei'] = $detail['product']['is_imei'];
        //     $data['imei_number'] = $detail->imei_number;

        //     $details[] = $data;
        // }

        $settings = Setting::where('deleted_at', '=', null)->first();
        // $symbol = $helpers->Get_Currency_Code();

        $pdf = \PDF::loadView('pdf.ObReport_pdf', [
            // 'symbol' => $symbol,
            'setting' => $settings,
            'quote' => $quote,
            // 'details' => $details,
        ]);
        return $pdf->download('OBReport.pdf');

    }

    //---------------- Show Form Create ObReport ---------------\\

    public function create(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'create', ObReport::class);

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if($user_auth->is_all_warehouses){
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        }else{
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        $clients = Client::where('deleted_at', '=', null)->get(['id', 'name']);

        return response()->json([
            'clients' => $clients,
            'warehouses' => $warehouses,
        ]);
    }

    //------------- Show Form Edit ObReport -----------\\

    public function edit(Request $request, $id)
    {

        // $this->authorizeForUser($request->user('api'), 'update', ObReport::class);
        // $role = Auth::user()->roles()->first();
        // $view_records = Role::findOrFail($role->id)->inRole('record_view');
        // $ObReport = ObReport::with('details.product.unitSale')
        //     ->where('deleted_at', '=', null)
        //     ->findOrFail($id);
        // $details = array();
        // // Check If User Has Permission view All Records
        // if (!$view_records) {
        //     // Check If User->id === ObReport->id
        //     $this->authorizeForUser($request->user('api'), 'check_record', $ObReport);
        // }

        // if ($ObReport->client_id) {
        //     if (Client::where('id', $ObReport->client_id)
        //         ->where('deleted_at', '=', null)
        //         ->first()) {
        //         $quote['client_id'] = $ObReport->client_id;
        //     } else {
        //         $quote['client_id'] = '';
        //     }
        // } else {
        //     $quote['client_id'] = '';
        // }

        // if ($ObReport->warehouse_id) {
        //     if (Warehouse::where('id', $ObReport->warehouse_id)
        //         ->where('deleted_at', '=', null)
        //         ->first()) {
        //         $quote['warehouse_id'] = $ObReport->warehouse_id;
        //     } else {
        //         $quote['warehouse_id'] = '';
        //     }
        // } else {
        //     $quote['warehouse_id'] = '';
        // }

        // $quote['date'] = $ObReport->date;
        // $quote['tax_rate'] = $ObReport->tax_rate;
        // $quote['discount'] = $ObReport->discount;
        // $quote['shipping'] = $ObReport->shipping;
        // $quote['statut'] = $ObReport->statut;
        // $quote['notes'] = $ObReport->notes;

        // $detail_id = 0;
        // foreach ($ObReport['details'] as $detail) {

        //      //check if detail has sale_unit_id Or Null
        //      if($detail->sale_unit_id !== null){
        //         $unit = Unit::where('id', $detail->sale_unit_id)->first();
        //     }else{
        //         $product_unit_sale_id = Product::with('unitSale')
        //         ->where('id', $detail->product_id)
        //         ->first();
        //         $unit = Unit::where('id', $product_unit_sale_id['unitSale']->id)->first();
        //         $data['no_unit'] = 0;
        //     }

        //     if ($detail->product_variant_id) {
        //         $item_product = product_warehouse::where('product_id', $detail->product_id)
        //             ->where('product_variant_id', $detail->product_variant_id)
        //             ->where('warehouse_id', $ObReport->warehouse_id)
        //             ->where('deleted_at', '=', null)
        //             ->first();

        //         $productsVariants = ProductVariant::where('product_id', $detail->product_id)
        //             ->where('id', $detail->product_variant_id)->first();

        //         $item_product ? $data['del'] = 0 : $data['del'] = 1;
        //         $data['product_variant_id'] = $detail->product_variant_id;
        //         $data['code'] = $productsVariants->name . '-' . $detail['product']['code'];

        //         if ($unit && $unit->operator == '/') {
        //             $data['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
        //         } else if ($unit && $unit->operator == '*') {
        //             $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
        //         } else {
        //             $data['stock'] = 0;
        //         }

        //     } else {
        //         $item_product = product_warehouse::where('product_id', $detail->product_id)
        //             ->where('deleted_at', '=', null)
        //             ->where('warehouse_id', $ObReport->warehouse_id)
        //             ->where('product_variant_id', '=', null)
        //             ->first();

        //         $item_product ? $data['del'] = 0 : $data['del'] = 1;
        //         $data['product_variant_id'] = null;
        //         $data['code'] = $detail['product']['code'];

        //         if ($unit && $unit->operator == '/') {
        //             $data['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
        //         } else if ($unit && $unit->operator == '*') {
        //             $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
        //         } else {
        //             $data['stock'] = 0;
        //         }

        //     }

        //     $data['id'] = $detail->id;
        //     $data['detail_id'] = $detail_id += 1;
        //     $data['product_id'] = $detail->product_id;
        //     $data['quantity'] = $detail->quantity;
        //     $data['name'] = $detail['product']['name'];
        //     $data['etat'] = 'current';
        //     $data['qte_copy'] = $detail->quantity;
        //     $data['total'] = $detail->total;
        //     $data['unitSale'] = $unit->ShortName;
        //     $data['sale_unit_id'] = $unit->id;
        //     $data['is_imei'] = $detail['product']['is_imei'];
        //     $data['imei_number'] = $detail->imei_number;

        //     if ($detail->discount_method == '2') {
        //         $data['DiscountNet'] = $detail->discount;
        //     } else {
        //         $data['DiscountNet'] = $detail->price * $detail->discount / 100;
        //     }

        //     $tax_price = $detail->TaxNet * (($detail->price - $data['DiscountNet']) / 100);
        //     $data['Unit_price'] = $detail->price;
        //     $data['tax_percent'] = $detail->TaxNet;
        //     $data['tax_method'] = $detail->tax_method;
        //     $data['discount'] = $detail->discount;
        //     $data['discount_Method'] = $detail->discount_method;

        //     if ($detail->tax_method == '1') {
        //         $data['Net_price'] = $detail->price - $data['DiscountNet'];
        //         $data['taxe'] = $tax_price;
        //         $data['subtotal'] = ($data['Net_price'] * $data['quantity']) + ($tax_price * $data['quantity']);
        //     } else {
        //         $data['Net_price'] = ($detail->price - $data['DiscountNet']) / (($detail->TaxNet / 100) + 1);
        //         $data['taxe'] = $detail->price - $data['Net_price'] - $data['DiscountNet'];
        //         $data['subtotal'] = ($data['Net_price'] * $data['quantity']) + ($tax_price * $data['quantity']);
        //     }

        //     $details[] = $data;
        // }

        // //get warehouses assigned to user
        // $user_auth = auth()->user();
        // if($user_auth->is_all_warehouses){
        //     $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        // }else{
        //     $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
        //     $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        // }

        // $clients = Client::where('deleted_at', '=', null)->get(['id', 'name']);

        // return response()->json([
        //     'details' => $details,
        //     'quote' => $quote,
        //     'clients' => $clients,
        //     'warehouses' => $warehouses,
        // ]);
    }

     //-------------------Sms Notifications -----------------\\

     public function Send_SMS(Request $request)
     {
         $ObReport = ObReport::where('deleted_at', '=', null)->findOrFail($request->id);
         $settings = Setting::where('deleted_at', '=', null)->first();
         $gateway = sms_gateway::where('id' , $settings->sms_gateway)
         ->where('deleted_at', '=', null)->first();

         $url = url('/api/quote_pdf/' . $request->id);
         $receiverNumber = $ObReport['client']->phone;
         $message = "Dear" .' '.$ObReport->client_name." \n We are contacting you in regard to a ObReport #".$ObReport->Ref.' '.$url.' '. "that has been created on your account. \n We look forward to conducting future business with you.";

         //twilio
        if($gateway->title == "twilio"){
            try {

                $account_sid = env("TWILIO_SID");
                $auth_token = env("TWILIO_TOKEN");
                $twilio_number = env("TWILIO_FROM");

                $client = new Client_Twilio($account_sid, $auth_token);
                $client->messages->create($receiverNumber, [
                    'from' => $twilio_number,
                    'body' => $message]);

            } catch (Exception $e) {
                return response()->json(['message' => $e->getMessage()], 500);
            }

        //nexmo
        }elseif($gateway->title == "nexmo"){
            try {

                $basic  = new \Nexmo\Client\Credentials\Basic(env("NEXMO_KEY"), env("NEXMO_SECRET"));
                $client = new \Nexmo\Client($basic);
                $nexmo_from = env("NEXMO_FROM");

                $message = $client->message()->send([
                    'to' => $receiverNumber,
                    'from' => $nexmo_from,
                    'text' => $message
                ]);

            } catch (Exception $e) {
                return response()->json(['message' => $e->getMessage()], 500);
            }
        }
    }
}
