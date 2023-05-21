<?php

namespace App\Http\Controllers;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function create()
    {
        // Return view or perform any necessary operations for the create form
    }

    public function store(ProductRequest $request)
    {
        $validatedData = $request->validated();

        
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $extension = $photo->getClientOriginalExtension();
            $filename = 'product_' . time() . '.' . $extension;
            $photoPath = $photo->storeAs('public/products', $filename);
            $validatedData['photo'] = url(Storage::url($photoPath));
        }
        

        $product = Product::create($validatedData);
        return response()->json($product, 201);
    }
    

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function edit(Product $product)
    {
        // Return view or perform any necessary operations for the edit form
    }


    public function update(ProductRequest $request, Product $product)
    {
        $validatedData = $request->validated();
    
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $extension = $photo->getClientOriginalExtension();
            $filename = 'product_' . time() . '.' . $extension;
            $photoPath = $photo->storeAs('public/products', $filename);
            $photoUrl = url(Storage::url($photoPath));
    
            // Delete the previous photo if it exists
            if ($product->photo) {
                $previousPhotoPath = str_replace(url('/'), '', $product->photo);
                Storage::delete($previousPhotoPath);
            }
    
            $validatedData['photo'] = $photoUrl;
        }
    
        $product->update($validatedData);
    
        return response()->json($product);
    }
    
    


    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}