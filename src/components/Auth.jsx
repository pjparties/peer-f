import React from "react";
import AuthButton from "./AuthButton";
import { Selector } from "./Selector.jsx";

const Auth = () => {
  return (
    <div className="flex h-screen w-2/5 min-w-fit flex-col">
      <div className="main-wrapper my-4 flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-2">
        <div className="text-wrapper">
          <h1 className="text-center text-4xl font-bold text-white ">
            Get Started
          </h1>
          <p className="text-lg font-medium text-white">
            Sign up or login to get started
          </p>
        </div>
        <div className="buttons-wrapper flex flex-col items-center justify-center gap-4">
          <AuthButton
            title="Sign In"
            target="/"
            signIn={() => { }}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
