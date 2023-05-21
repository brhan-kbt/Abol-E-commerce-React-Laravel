<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserAccountResource extends JsonResource
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
            'username' => $this->username,
            'role' => new RoleResource($this->whenLoaded('role')),
            'customer' => new CustomerResource($this->whenLoaded('customer')),
            'coffeeBrandOwner' => new CoffeeBrandOwnerResource($this->whenLoaded('coffeeBrandOwner')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
