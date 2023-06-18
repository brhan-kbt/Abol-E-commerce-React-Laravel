<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'subscriptionName' => $this->subscriptionName,
            'subscriptionPrice' => $this->subscriptionPrice,
            'product_limit' => $this->product_limit,
            'features' => $this->features,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
