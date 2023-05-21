<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CoffeeBrandOwnerResource extends JsonResource
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
            'coffeeBrandName' => $this->coffeeBrandName,
            'address' => $this->address,
            'licenseNumber' => $this->licenseNumber,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
