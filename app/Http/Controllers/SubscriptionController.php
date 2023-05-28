<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SubscriptionRequest;
use App\Http\Resources\SubscriptionResource;
use App\Models\Subscription;

class SubscriptionController extends Controller
{
    public function index()
    {
        $subscriptions = Subscription::all();

        return response()->json(SubscriptionResource::collection($subscriptions), 200);
    }

    public function show($id)
    {
        $subscription = Subscription::findOrFail($id);

        return response()->json(new SubscriptionResource($subscription), 200);
    }

    public function store(SubscriptionRequest $request)
    {
        $subscription = Subscription::create($request->validated());

        return response()->json(new SubscriptionResource($subscription), 201);
    }

    public function update(SubscriptionRequest $request, $id)
    {
        $subscription = Subscription::findOrFail($id);

        $subscription->update($request->validated());

        return response()->json(new SubscriptionResource($subscription), 200);
    }

    public function destroy($id)
    {
        $subscription = Subscription::findOrFail($id);

        $subscription->delete();

        return response()->json(null, 204);
    }
}

