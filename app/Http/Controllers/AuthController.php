<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserAccountResource;
use App\Http\Resources\RoleResource;
use App\Models\User;
use App\Models\Customer;
use App\Models\CoffeeBrandOwner;
use Illuminate\Http\Request;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
    
        // Create a UserAccount
        $user = User::create([
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
            'role_id' => $data['role_id'],
        ]);

    
        // Create a Customer if userType is 'customer'

        if ($data['role_id'] == 1) {
            $customer = Customer::create([
                'fullName' => $data['fullName'],
                'address' => $data['address'],
                // Add other fields specific to the Customer model
            ]);

    
            // Associate the Customer with the UserAccount
            $user->customer()->associate($customer);
        }
    
        // Create a CoffeeBrandOwner if userType is 'coffeebrand'
        if ($data['role_id'] == 2) {
            $coffeeBrandOwner = CoffeeBrandOwner::create([
                'coffeeBrandName' => $data['coffeeBrandName'],
                'address' => $data['address'],
                'licenseNumber' => $data['licenseNumber'],
                // Add other fields specific to the CoffeeBrandOwner model
            ]);
    
            // Associate the CoffeeBrandOwner with the UserAccount
            $user->coffeeBrandOwner()->associate($coffeeBrandOwner);
        }
    
        // Find the Role by ID
        $role = Role::find($data['role_id']);
    
        // Associate the Role with the UserAccount
        $user->role()->associate($role);
    
        // Save the UserAccount and associated models
        DB::transaction(function () use ($user) {
            $user->save();
            $user->load('customer', 'coffeeBrandOwner', 'role');
        });
    
        // Generate a token for the user
        $token = $user->createToken('main')->plainTextToken;
    
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }
   
    public function update(Request $request, $id)
    {
        // Find the user by ID
        $user = User::findOrFail($id);
    
        // Update the user's data
        $user->update([
            'username' => $request->username,
            'role_id' => $request->role_id,
        ]);
    
        // Update role-specific data
        if ($request->role_id == 1) { // Customer role
            $user->customer()->updateOrCreate([], [
                'fullName' => $request->fullName,
                'address' => $request->address,
                // Update other fields specific to the Customer model
            ]);
        } elseif ($request->role_id == 2) { // Coffee Brand Owner role
            $user->coffeeBrandOwner()->updateOrCreate([], [
                'coffeeBrandName' => $request->coffeeBrandName,
                'address' => $request->address,
                'licenseNumber' => $request->licenseNumber,
                // Update other fields specific to the CoffeeBrandOwner model
            ]);
        }
    
        // Refresh the user data
        $user->refresh();
    
        // Return the updated user with a success message
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

   public function delete($id)
    {
        // Find the user by ID
        $user = User::findOrFail($id);

        // Get the role ID
        $role_id = $user->role_id;

        // Delete the user based on the role ID
        if ($role_id == 1) { // Customer role
            // Remove the customer association from the user
            $user->customer()->dissociate();
            $user->save();
            
            // Delete the associated Customer model
            if ($user->customer) {
                $user->customer->delete();
            }
        } elseif ($role_id == 2) { // Coffee Brand Owner role
            // Remove the coffee brand owner association from the user
            $user->coffeeBrandOwner()->dissociate();
            $user->save();

            // Delete the associated CoffeeBrandOwner model
            if ($user->coffeeBrandOwner) {
                $user->coffeeBrandOwner->delete();
            }
        }

        // Delete the user
        $user->delete();

        return response()->json([
            'message' => 'User and associated models deleted successfully',
        ]);
    }

    public function getRoles()
    {
        $roles = Role::all();

        return response()->json([
            'roles' => RoleResource::collection($roles),
        ]);
    }

    public function getAllCustomers()
    {
        $users = User::with('role', 'customer')
            ->whereHas('role', function ($query) {
                $query->where('name', 'customer');
            })
            ->get();
            
        return UserAccountResource::collection($users);
    }
    
    public function getAllCoffeeBrand()
    {
        $users = User::with('role', 'coffeeBrandOwner')
            ->whereHas('role', function ($query) {
                $query->where('name', 'coffeebrand');
            })
            ->get();
            
        return UserAccountResource::collection($users);
    }
    

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => new UserAccountResource($user),
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }

    // Add role
    public function addRole(Request $request)
    {
        $role = Role::create($request->all());
        return response()->json(['success' => true, 'data' => $role], 201);
    }

    // Edit role
    public function editRole(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->update($request->all());
        return response()->json(['success' => true, 'data' => $role], 200);
    }

    public function deleteRole($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json(['success' => true, 'message' => 'Role deleted successfully'], 200);
    }
}
