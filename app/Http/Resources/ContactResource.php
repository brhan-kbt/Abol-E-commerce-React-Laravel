<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
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
            'fullName' => $this->fullName,
            'email' => $this->email,
            'message' => $this->message,
            'user' => new UserAccountResource($this->user), // If you have a UserResource, you can include the user data
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
