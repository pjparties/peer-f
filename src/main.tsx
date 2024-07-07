import React from 'react'
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Home } from './pages/Home/index.js';
import { Chat } from './pages/Chat/index.jsx';
import { Preferences } from './pages/Preferences/index.jsx';

import { startMirage } from './mocks/miragejs/index.js';

// clerk
import { ClerkProvider } from '@clerk/clerk-react';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}


import './index.css'
import ErrorPage from './pages/Error/index.jsx';

if (import.meta.env.DEV) {
    // startMirage();
} else {
    console.log('Enviroment: ', import.meta.env);
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "/chat/:prefId",
        element: <Chat />
    },
    {
        path: "/preferences",
        element: <Preferences />,
    },


]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <ToastContainer />
            <div className='w-screen h-screen overflow-hidden'>
                <RouterProvider router={router} />
            </div>
        </ClerkProvider>
    </React.StrictMode>,
)
