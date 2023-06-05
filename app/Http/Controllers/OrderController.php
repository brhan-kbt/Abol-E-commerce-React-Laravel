<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        return OrderResource::collection($orders);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
        public function store(Request $request)
        {
            // Validate the request data
             $validatedData = $request->validate([
                  'address' => '',
                  'user_id' => '',
                  'status' => '',
                  'products' => '',
                  'payment' => '',
                  'delivery_entity_id' => '',
                  'totalprice' => '',
                //  'items.*.product_id' => '',
                //  'items.*.quantity' => '',
                //  'items.*.price' => 'required|numeric',
             ]);
    
            // Create the order
            $order = Order::create([
                'address' => $validatedData['address'],
                'payment' => $validatedData['payment'],
                'delivery_entity_id' => $validatedData['delivery_entity_id'],
                'totalprice' => $validatedData['totalprice'],
                'user_id' => $validatedData['user_id'],
                'status' => $validatedData['status'],
            ]);
    
            // Create order items
            foreach ($validatedData['products'] as $itemData) {
                $order->items()->create([
                    'product_id' => $itemData['product_id'],
                    'quantity' => $itemData['quantity'],
                    'price' => 1000,
                ]);
            }
    
            // Return the created order with customer and item details
            return new OrderResource($order->load('user', 'items'));
        }

    /**
     * Display the specified resource.
     */

     public function update(Request $request, Order $order)
{
    $validatedData = $request->validate([
        'status' => 'string',
    ]);

    $order->update([
        'status' => $validatedData['status'],
    ]);

    return new OrderResource($order->load('user', 'items'));
}


    public function update22(Request $request, Order $order)
    {
        $validatedData = $request->validate([
            'address' => 'string',
            'user_id' => 'integer',
            'status' => 'string',
            'products' => 'array',
            // Add validation rules for other fields if needed
        ]);

        $order->update($validatedData);

        return new OrderResource($order->load('user', 'items'));
    }


    public function OrderOfSpecificUser($id)
{
    // $user_id = $request->input('user_id'); // Assuming user_id is passed as a query parameter
    
    // Retrieve orders related to the specific user
    $orders = Order::where('user_id', $id)->get();
    
    return OrderResource::collection($orders);
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(order $order)
    {
        //
    }

   
}
