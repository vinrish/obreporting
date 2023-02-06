<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    //----------- GET ALL  Branch --------------\\

    public function index(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Branch::class);

        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;

        $branches = Branch::where('deleted_at', '=', null)

        // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('name', 'LIKE', "%{$request->search}%")
                        ->orWhere('mobile', 'LIKE', "%{$request->search}%")
                        ->orWhere('country', 'LIKE', "%{$request->search}%")
                        ->orWhere('city', 'LIKE', "%{$request->search}%")
                        ->orWhere('zip', 'LIKE', "%{$request->search}%")
                        ->orWhere('email', 'LIKE', "%{$request->search}%");
                });
            });
        $totalRows = $branches->count();
        if($perPage == "-1"){
            $perPage = $totalRows;
        }
        $branches = $branches->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        return response()->json([
            'branches' => $branches,
            'totalRows' => $totalRows,
        ]);
    }

    //----------- Store new Branch --------------\\

    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Branch::class);

        request()->validate([
            'name' => 'required',
        ]);

        \DB::transaction(function () use ($request) {

            $Branch = new Branch;
            $Branch->name = $request['name'];
            $Branch->mobile = $request['mobile'];
            $Branch->country = $request['country'];
            $Branch->city = $request['city'];
            $Branch->zip = $request['zip'];
            $Branch->email = $request['email'];
            $Branch->save();

        }, 10);

        return response()->json(['success' => true]);
    }

    //-----------Update Branch --------------\\

    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Branch::class);

        request()->validate([
            'name' => 'required',
        ]);

        Branch::whereId($id)->update([
            'name' => $request['name'],
            'mobile' => $request['mobile'],
            'country' => $request['country'],
            'city' => $request['city'],
            'zip' => $request['zip'],
            'email' => $request['email'],
        ]);
        return response()->json(['success' => true]);
    }

    //----------- Delete  Branch --------------\\

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Branch::class);

        \DB::transaction(function () use ($id) {

            Branch::whereId($id)->update([
                'deleted_at' => Carbon::now(),
            ]);

        }, 10);

        return response()->json(['success' => true]);
    }

    //-------------- Delete by selection  ---------------\\

    public function delete_by_selection(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'delete', Branch::class);

        \DB::transaction(function () use ($request) {
            $selectedIds = $request->selectedIds;
            foreach ($selectedIds as $branch_id) {
                Branch::whereId($branch_id)->update([
                    'deleted_at' => Carbon::now(),
                ]);
            }

        }, 10);

        return response()->json(['success' => true]);
    }

    //----------- GET ALL  Branch --------------\\

    public function Get_Branches()
    {
        $Branches = Branch::where('deleted_at', '=', null)->get();
        return response()->json($Branches);
    }
}
