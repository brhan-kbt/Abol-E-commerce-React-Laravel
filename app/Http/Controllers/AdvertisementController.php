<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\AdvertisementRequest;
use App\Http\Resources\AdvertisementResource;
use App\Http\Resources\UserAccountResource;
use Illuminate\Support\Facades\Storage;

class AdvertisementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $advertisement = Advertisement::with('user')->get();
    
        return response()->json($advertisement);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AdvertisementRequest $request)
    {
        $validatedData = $request->validated();

        
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $extension = $photo->getClientOriginalExtension();
            $filename = 'advert_' . time() . '.' . $extension;
            $photoPath = $photo->storeAs('public/adverts', $filename);
            $validatedData['photo'] = url(Storage::url($photoPath));
        }
        

        // Retrieve the user by user_id
    try {
        $userToAssociate = User::findOrFail($request->input('user_id'));
    } catch (ModelNotFoundException $exception) {
        return response()->json(['error' => 'User not found'], 404);
    }

    // Associate the user with the product
    $product = $userToAssociate->advertisements()->create($validatedData);

    return response()->json($product, 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(Advertisement $advertisement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Advertisement $advertisement)
    {
        //
    }

    public function update(AdvertisementRequest $request, Advertisement $advert)
    {
        $validatedData = $request->validated();
    
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $extension = $photo->getClientOriginalExtension();
            $filename = 'advert_' . time() . '.' . $extension;
            $photoPath = $photo->storeAs('public/adverts', $filename);
            $photoUrl = url(Storage::url($photoPath));
    
            // Delete the previous photo if it exists
            if ($advert->photo) {
                $previousPhotoPath = str_replace(url('/'), '', $advert->photo);
                Storage::delete($previousPhotoPath);
            }
    
            $validatedData['photo'] = $photoUrl;
        }
        // Add the "status" field to the $validatedData array
        if ($request->has('status')) {
            $validatedData['status'] = $request->input('status');
        }
    
    
        $advert->update($validatedData);
    
        return response()->json($advert);
    }
    

    /**
     * Remove the specified resource from storage.
     */

     public function destroy(Advertisement $advertisement)
     {
         // Delete the advertisement
         $advertisement->delete();
     
         return response()->json(null, 204);
     }
     
    public function specificUserAdverts($id)
    {
        $user = User::findOrFail($id);
        $advertisements = $user->advertisements;

        return AdvertisementResource::collection($advertisements);
    }
}
