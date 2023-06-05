<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();

        return ContactResource::collection($contacts);
    }

    public function show(Contact $contact)
    {
        return new ContactResource($contact);
    }

    public function store(ContactRequest $request)
    {
        // Get the user_id from the request
        $user_id = $request->input('user_id');
    
        // Find the user based on the user_id
        $user = User::find($user_id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Create a new contact for the user
        $contact = $user->contacts()->create($request->validated());
    
        return new ContactResource($contact);
    }
    
    public function update(ContactRequest $request, Contact $contact)
    {
        $contact->update($request->validated());

        return new ContactResource($contact);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return response()->noContent();
    }
}
