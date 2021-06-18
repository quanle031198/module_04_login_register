<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function register(Request $request){
        $user = User::where('email',$request['email'])->first();

        if($user){
            $response['status'] = 0;
            $response['message'] = 'Email Already Exists';
            $response['code'] = 409;
        }else{
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            $response['status'] = 1;
            $response['message'] = 'User register successfully!';
            $response['code'] = 200;

        }

        return response()->json($response);
    }
    public function login(Request $request){
        $credentials = $request->only('email','password');
        try{
            if(!JWTAuth::attempt($credentials)){
                $response['status'] = 0;
                $response['message'] = 'Email or Password is incorrect !';
                $response['data'] = null;
                $response['code'] = 401;
                return response()->json($response);

            }
        }catch(JWTException $e){
            $response['data'] = null;
            $response['message'] = 'Could not create token !';
            $response['code'] = 500;
            return response()->json($response);

        }

        $user = auth()->user();
        $data['token'] = auth()->claims([
            'user_id' => $user->id,
            'email' => $user->email
        ])->attempt($credentials);

        $response['status'] = 1;
        $response['message'] = 'Login Successfully !';
        $response['data'] = $data;
        $response['code'] = 200;
        return response()->json($response);


    }
}
