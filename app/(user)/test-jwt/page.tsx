'use client'
import { NextResponse } from 'next/server';
import React, { useState } from 'react'
import { date } from 'yup';
import { useCreateProductMutation, useUpdateProductMutation } from '@/redux/service/product';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selecToken, setAccessToken } from '@/redux/features/auth/authSlice';

export default function TestJWT() {

    // const [createProduct, {data, isLoading, error}] = useCreateProductMutation();
    const [updateProduct, {data, isLoading, error}] = useUpdateProductMutation();
    const [user, setUser] = useState(null);
    const [unAuthorized, setUnAuthorized] = useState(false);

    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(selecToken)

    


    const newProduct = {
		"category": {
		  "name": "shirt",
		  "icon": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1693342954-rincon-3-64ee5ca62e001.jpg?crop=1xw:1xh;center,top&resize=980:*"
		},
		"name": "Grey T-shirt",
		"desc": "Lightweight running shoes have come a long way as both racing flats and daily trainers. Once upon a time, to shave grams on a shoe and get it down to a competitive weight, brands had to make considerable compromises in comfort and stability—but that’s no longer the case. Thanks to lighter midsole foams and meshy upper materials, some of our favorite supportive and maximally cushioned shoes now sit well below 8 ounces on the scale.",
		"image": "https://store.istad.co/media/product_images/hmgoepprod.jpeg",
		"price": "95.25",
		"quantity": 50
	  }
    // handle create product
    // const handleCreateProduct = async () => {
    //     createProduct({
    //         newProduct, accessToken
    //     })
    // }

    const handleUpdateProductById = async () => {
        updateProduct(
            {
                id: 501,
                updatedProduct: { name: "Red T-Shirt" },
            }
        )
    }

    // handle login
    const handleLogin = async () => {
        const email = "srengchipor99@gmail.com";
        const password = "seeyounext18years";

        fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
            method:"POST",
            body: JSON.stringify({email, password})
        }).then(res => res.json()).then(data => {
            console.log("Data in jwt test", data);
            dispatch(setAccessToken(data.accessToken))
            
        }).catch(err => console.log(err)
        )

    }

    // handle partial update
    const handlePartialUpdate = async () => {
        const body = {
            "name": "Black T-Shirt (update)"
          };

            const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/${501}`, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({body})
            })

            if(res.status === 401) {
                setUnAuthorized(true)
            }
            const data = await res.json()
            console.log("Data from partial update: ", data);
            

    }

    // handle refresh token
    const handleRefreshToken = async () => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/refresh', {
            method:"POST",
            credentials: 'include',
            body:JSON.stringify({})
        }).then(res => res.json())
        .then(data => {
            console.log("Data from refresh token: ", data);
            dispatch(setAccessToken(data.accessToken))
        })
        .catch(err => console.log(err))
    }
    
    // handle logout
    const handleLogout = async () => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/logout', {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({})
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            setAccessToken(data.accessToken)
        })
        .catch(err => console.log(err))
    }

    if (isLoading) return (
        <main>
            <h1>
                Loading...
            </h1>
        </main>
    )
    return (
        <main className='h-screen grid place-content-center'>
            <h1 className='text-5xl'>Test JWT</h1>
            <button onClick={handleLogin} className='my-3 p-4 bg-green-500 rounded-xl text-white text-2xl font-semibold'>
                Login
            </button>
            <button onClick={handlePartialUpdate} className='my-3 p-4 bg-yellow-500 rounded-xl text-white text-2xl font-semibold'>
                Partial update
            </button>
            {/* <button onClick={handleCreateProduct} className='my-3 p-4 bg-yellow-500 rounded-xl text-white text-2xl font-semibold'>
                Create Product
            </button> */}
            {/* { 
                unAuthorized && 
                <button onClick={handleRefreshToken} className='my-3 p-4 bg-red-500 rounded-xl text-white text-2xl font-semibold'>
                    Refresh
                </button>
            } */}
            <button onClick={handleLogout} className='my-3 p-4 bg-blue-500 rounded-xl text-white text-2xl font-semibold'>
                Logout
            </button>
            <button onClick={handleUpdateProductById} className='my-3 p-4 bg-yellow-500 rounded-xl text-white text-2xl font-semibold'>
                Update product with RTK
            </button>
        </main>
    )

}
