<?php

namespace App\Http\Controllers;

use App\Mail\ObReportMail;
use App\Models\ObReport;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Branch;
use App\Models\User;
use App\Models\BranchUser;
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
        // $view_records = Role::findOrFail($role->id)->inRole('record_view');

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
        $obreports = ObReport::where('deleted_at', '=', null);

        //Multiple Filter
        $Filtred = $helpers->filter($obreports, $columns, $param, $request)
        //Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('client_name', 'LIKE', "%{$request->search}%");
                });
            });

        $totalRows = $Filtred->count();
        if($perPage == "-1"){
            $perPage = $totalRows;
        }
        $obreports = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($obreports as $obreport) {

            $item['id'] = $obreport->id;
            $item['date'] = $obreport->date;
            $item['Ref'] = $obreport->Ref;
            $item['phone'] = $obreport->phone;
            $item['client_name'] = $obreport->client_name;
            $item['reporter_name'] = $obreport->reporter_name;
            $item['reporter_id'] = $obreport->reporter_id;
            $item['notes'] = $obreport->notes;
            $item['subject'] = $obreport->subject;

            $data[] = $item;
        }

        return response()->json([
            'totalRows' => $totalRows,
            'obreports' => $data,
        ]);
    }

    //------------ Store new obreport -------------\\

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
            $order->branch = $request->branch;
            $order->client_name = $request->client_name;
            $order->client_personel = $request->client_personel;
            $order->personel = $request->personel;
            $order->subject = $request->subject;
            $order->reporter_name = $request->reporter_name;
            $order->reporter_id = $request->reporter_id;
            $order->phone = $request->phone;
            $order->escalate = $request->escalate;
            $order->notes = $request->notes;
            // $order->user_id = Auth::user()->id;

            $order->save();

        }, 10);
        return response()->json(['success' => true]);
    }

    //------------ Update ObReport -------------\\

    public function update(Request $request, $id)
    {
    }

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
        $ObReport_data = ObReport::where('deleted_at', '=', null)
            ->findOrFail($id);

        $details = array();

        $quote['Ref'] = $ObReport_data->Ref;
        $quote['date'] = $ObReport_data->date;
        $quote['note'] = $ObReport_data->notes;
        $quote['client_name'] = $ObReport_data->client_name;
        $quote['reporter_name'] = $ObReport_data->reporter_name;
        $quote['reporter_id'] = $ObReport_data->reporter_id;
        $quote['subject'] = $ObReport_data->subject;
        $quote['phone'] = $ObReport_data->phone;
        $quote['branch'] = $ObReport_data->branch;
        $quote['escalate'] = $ObReport_data->escalate;
        $quote['client_personel'] = $ObReport_data->client_personel;
        $quote['personel'] = $ObReport_data->personel;

        $company = Setting::where('deleted_at', '=', null)->first();

        return response()->json([
            'quote' => $quote,
            'company' => $company,
        ]);

    }

    //---------------- Reference Number Of ObReport  ---------------\\

    public function getNumberOrder()
    {
        $last = DB::table('ob_reports')->latest('id')->first();

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
        $Quotation = ObReport::where('deleted_at', '=', null)
            ->findOrFail($id);

        $quote['client_name'] = $Quotation->client_name;
        $quote['phone'] = $Quotation->phone;
        $quote['reporter_name'] = $Quotation->reporter_name;
        $quote['reporter_id'] = $Quotation->reporter_id;
        $quote['subject'] = $Quotation->subject;
        $quote['escalate'] = $Quotation->escalate;
        $quote['client_personel'] = $Quotation->client_personel;
        $quote['personel'] = $Quotation->personel;
        $quote['branch'] = $Quotation->branch;
        $quote['note'] = $Quotation->notes;
        $quote['Ref'] = $Quotation->Ref;
        $quote['date'] = $Quotation->date;

        $settings = Setting::where('deleted_at', '=', null)->first();

        $pdf = \PDF::loadView('pdf.obReport_pdf', [
            'setting' => $settings,
            'quote' => $quote,
        ]);
        return $pdf->download('OBReport.pdf');

    }

    //---------------- Show Form Create ObReport ---------------\\

    public function create(Request $request)
    {

    }

    //------------- Show Form Edit ObReport -----------\\

    public function edit(Request $request, $id)
    {


    }

     //-------------------Sms Notifications -----------------\\

     public function Send_SMS(Request $request)
     {
         $ObReport = Report::where('deleted_at', '=', null)->findOrFail($request->id);
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
