<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeliveryRequest;
use App\Http\Resources\DeliveryResource;
use App\Models\DeliveryEntity;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $deliveries = DeliveryEntity::all();
        return DeliveryResource::collection($deliveries);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\DeliveryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DeliveryRequest $request)
    {
        $delivery = DeliveryEntity::create($request->validated());
        return new DeliveryResource($delivery);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DeliveryEntity  $delivery
     * @return \Illuminate\Http\Response
     */
    public function show(DeliveryEntity $delivery)
    {
        return new DeliveryResource($delivery);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\DeliveryRequest  $request
     * @param  \App\Models\DeliveryEntity  $delivery
     * @return \Illuminate\Http\Response
     */
    public function update(DeliveryRequest $request, DeliveryEntity $delivery)
    {
        $delivery->update($request->validated());
        return new DeliveryResource($delivery);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DeliveryEntity  $delivery
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeliveryEntity $delivery)
    {
        $delivery->delete();
        return response()->noContent();
    }
}
