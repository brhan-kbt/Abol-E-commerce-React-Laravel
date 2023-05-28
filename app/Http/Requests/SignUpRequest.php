<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'fullName' => '',
            'coffeeBrandName' => '',
            'role_id' => '',
            'address' => '',
            'licenseNumber' => '',
            'subscription_id' => '',
            'username' => 'required|unique:users,username',
            'password' => [
                'required',
                // 'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ];
    }
}
