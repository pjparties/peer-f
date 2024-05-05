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

import './index.css'

if (import.meta.env.DEV) {
    startMirage();
} else {
    console.log('Enviroment: ', import.meta.env);
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/chat",
        element: <Chat />,
    },
    {
        path: "/preferences",
        element: <Preferences />,
    },


]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ToastContainer />
        <div className='w-screen h-screen overflow-hidden'>
            <RouterProvider router={router} />
        </div>
    </React.StrictMode>,
)
