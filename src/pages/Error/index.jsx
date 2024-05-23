import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
    const [dogImage, setDogImage] = useState("");

    const getDogImage = async () => {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        setDogImage(data.message);
    };

    useEffect(() => {
        getDogImage();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <h1 className="text-4xl font-bold mb-4">Woof Woof!! Page not Found</h1>
            <p className="text-lg mb-8">Oops! The page you are looking for does not exist.</p>
            <img src={dogImage} alt="Dog" className="w-64 h-64 mb-8" />
            <Link to="/" className="text-blue-500 underline">Go back to the home page</Link>
        </div>
    );
};

export default ErrorPage;

