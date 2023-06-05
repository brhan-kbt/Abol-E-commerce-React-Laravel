<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'address' => $this->address,
            'customer' => new UserAccountResource($this->user), // Assuming you have a CustomerResource
            'status' => $this->status,
            'totalprice' => $this->totalprice,
            'payment' => $this->payment,
            'items' => OrderItemResource::collection($this->items), // Assuming you have an OrderItemResource
            'created_at' => $this->created_at,
            'delivery_entity_id' => $this->delivery_entity_id,
            'delivery' => new DeliveryResource($this->delivery),
            'updated_at' => $this->updated_at,

        ];
    }
}
