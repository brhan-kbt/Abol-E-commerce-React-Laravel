<?php

namespace App\Http\Controllers;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\RatingReview;
class ProductController extends Controller
{
   // ProductController.php

   public function index()
   {
       $products = Product::with('reviews')->get();
   
       $productsWithAverageRating = $products->map(function ($product) {
           $totalRating = $product->reviews->sum('rating');
           $averageRating = $product->reviews->count() > 0 ? $totalRating / $product->reviews->count() : 0;
   
           // Generate a unique ID for the row
           $rowId = $product->id;
   
           return [
               'id' => $rowId, // Assign the generated ID to the row
               'product' => $product,
               'average_rating' => $averageRating,
               'user' => $product->user // Assuming the product belongs to a user relationship
           ];
       });
   
       return response()->json($productsWithAverageRating);
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
        

        // Retrieve the user by user_id
    try {
        $userToAssociate = User::findOrFail($request->input('user_id'));
    } catch (ModelNotFoundException $exception) {
        return response()->json(['error' => 'User not found'], 404);
    }

    // Associate the user with the product
    $product = $userToAssociate->products()->create($validatedData);

    return response()->json($product, 201);
    }
    
    public function singleProduct($id)
    {
        $product = Product::with('user')->find($id);
    
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    
        return response()->json([
            'product' => $product,
            'user' => $product->user
        ]);
    }
    
    public function show(Product $product)
    {
        $productWithReviews = $product->load('reviews.user')->load('user.coffeeBrandOwner');
        $averageRating = $productWithReviews->reviews->average('rating');

        return response()->json([
            'product' => $productWithReviews,
            'average_rating' => $averageRating,
            'user' => $productWithReviews->user, 
        ]);
    }


    public function averageRating()
    {
        $totalRating = $this->reviews()->avg('rating');
        $averageRating = round($totalRating, 2); // Round to 2 decimal places

        return $averageRating;
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
        // Add the "status" field to the $validatedData array
        if ($request->has('status')) {
            $validatedData['status'] = $request->input('status');
        }
    
    
        $product->update($validatedData);
    
        return response()->json($product);
    }
    
    


    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }


    public function specificUserProducts($id)
    {
        $user = User::findOrFail($id);
        $products = $user->products;

        return ProductResource::collection($products);
    }
}