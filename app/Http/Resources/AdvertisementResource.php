<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdvertisementResource extends JsonResource
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
            'advertisementBrand' => $this->advertisementBrand,
            'advertisementType' => $this->advertisementType,
            'advertisementOwner' => $this->advertisementOwner,
            'photo' => $this->photo,
            'status' => $this->status,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'user_id' => $this->user_id,
            'user' => new UserAccountResource($this->user),
            // Include any other attributes or computed properties you need
        ];
    }
}
