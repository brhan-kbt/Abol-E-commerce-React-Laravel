<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'productName' => 'required|string|max:255',
            'productType' => 'required|string|max:255',
            'productWeight' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
        ];
    }
}
