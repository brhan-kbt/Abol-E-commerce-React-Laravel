<?php

namespace App\Http\Controllers;

use App\Models\RatingReview;
use Illuminate\Http\Request;
use App\Http\Requests\ReviewRatingRequest;
use App\Http\Resources\ReviewRatingResource;
use App\Models\User;
use App\Models\Product;
class RatingReviewController extends Controller
{
      public function index()
    {
        $reviews = RatingReview::all();
        return ReviewRatingResource::collection($reviews);
    }

    public function store(ReviewRatingRequest $request)
    {
        $user = User::findOrFail($request->input('user_id'));
        $product = Product::findOrFail($request->input('product_id'));

        $review = new RatingReview();
        $review->rating = $request->input('rating');
        $review->message = $request->input('message');

        // Set other review properties

        $user->reviews()->save($review);
        $product->reviews()->save($review);

        return new ReviewRatingResource($review);
    }

    public function show(Review $review)
    {
        return new ReviewRatingResource($review);
    }

    public function update(ReviewRatingRequest $request, RatingReview $review)
    {
        $user = User::findOrFail($request->input('user_id'));
        $product = Product::findOrFail($request->input('product_id'));

        $review->rating = $request->input('rating');
        $review->message = $request->input('message');

        // Update other review properties

        $user->reviews()->save($review);
        $product->reviews()->save($review);

        return new ReviewRatingResource($review);
    }

    public function destroy(RatingReview $review)
    {
        $review->delete();

        return response()->json(null, 204);
    }
}
