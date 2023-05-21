<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'productName' => $this->productName,
            'productType' => $this->productType,
            'productWeight' => $this->productWeight,
            'brand' => $this->brand,
            'brand' => $this->photo,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            // Include any other attributes or computed properties you need
        ];
    }
}
