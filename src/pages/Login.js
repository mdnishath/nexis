import React from "react";
import LoginForm from "../components/LoginForm";
const Login = () => {
  return (
    <div className="flex flex-col md:flex-row container mx-auto py-4 md:py-[100px] px-4 md:px-0">
      <div className="grow">
        <div className="flex flex-col md:flex-row">
          <div>
            <img className="" src="images/logo.png" alt="Logo" />
            <img className=" w-full" src="images/signup.png" alt="signup" />
          </div>
        </div>
      </div>
      <div className="grow-0 flex items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
