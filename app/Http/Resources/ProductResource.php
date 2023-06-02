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
            'photo' => $this->photo,
            'status'=>$this->status,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'user' => new UserAccountResource($this->userAccount),
            // Include any other attributes or computed properties you need
        ];
    }
}
