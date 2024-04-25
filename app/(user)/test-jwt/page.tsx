'use client'
import { NextResponse } from 'next/server';
import React, { useState } from 'react'
import { date } from 'yup';

export default function TestJWT() {

    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState(null);
    const [unAuthorized, setUnAuthorized] = useState(false);

    // handle login
    const handleLogin = async () => {
        const email = "srengchipor99@gmail.com";
        const password = "seeyounext18years";

        fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
            method:"POST",
            headers:{

            },
            body: JSON.stringify({email, password})
        }).then(res => res.json()).then(data => {
            console.log("Data in jwt test", data);
            
            setAccessToken(data.accessToken)
            
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
            setAccessToken(data.accessToken)
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

  return (
    <main className='h-screen grid place-content-center'>
        <h1 className='text-5xl'>Test JWT</h1>
        <button onClick={handleLogin} className='my-3 p-4 bg-green-500 rounded-xl text-white text-2xl font-semibold'>
            Login
        </button>
        <button onClick={handlePartialUpdate} className='my-3 p-4 bg-yellow-500 rounded-xl text-white text-2xl font-semibold'>
            Partial update
        </button>
        { 
            unAuthorized && 
            <button onClick={handleRefreshToken} className='my-3 p-4 bg-red-500 rounded-xl text-white text-2xl font-semibold'>
                Refresh
            </button>
        }
        <button onClick={handleLogout} className='my-3 p-4 bg-blue-500 rounded-xl text-white text-2xl font-semibold'>
            Logout
        </button>
    </main>
  )

}
