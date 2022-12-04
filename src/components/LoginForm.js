import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const LoginForm = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("nishtoken")) {
      navigate("/");
    }
  }, []);

  //Eror Handeling
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleLogin = async () => {
    if (!email) {
      setEmailError("Email Required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        setEmailError("Invalide email");
      }
    }
    if (password.length >= 8) {
    } else {
      setPasswordError("Your password must be 8 character");
    }

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email) &&
      password.length >= 8
    ) {
      const loginInfo = {
        email: email,
        password: password,
      };
      setLoading(true);
      const res = await axios.post(
        "https://test.nexisltd.com/login",
        loginInfo
      );
      console.log(res.status);
      console.log(res.data);
      localStorage.setItem("nishtoken", JSON.stringify(res.data));
      if (res.status === 200) {
        setLoading(false);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    }
  };
  return (
    <div className=" w-full md:w-[516px] md:h-[630px] md:mx-0 md:mr-[35px] py-10 my-[19px] shadow-all md:pt-[109px] md:pb-[61px] rounded">
      <h3 className=" font-inter font-semibold text-center text-xl mb-[100px]">
        Login Form
      </h3>
      <div className="flex flex-col gap-y-[64px] px-[74px]">
        <div className="w-full">
          <input
            className=" outline-none border-b border-border pl-4 w-full"
            type="email"
            placeholder="Write Email Address"
            onChange={(e) => handleEmail(e)}
            value={email}
          />
          <p className="text-red-500">{emailError && emailError}</p>
        </div>
        <div className="w-full">
          <input
            className=" outline-none border-b border-border pl-4 w-full"
            type="password"
            placeholder="xxxxxxxx"
            onChange={(e) => handlePassword(e)}
            value={password}
          />
          <p className="text-red-500">{passwordError && passwordError}</p>
        </div>
      </div>
      <div className="flex justify-center mt-[68px] mb-[113px] gap-x-20">
        {loading ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center px-[28px] py-[15px] bg-primary font-medium text-[16px] text-white rounded-[15px]"
          >
            Login
          </button>
        )}
      </div>
      <div>
        <p className="text-center text-xs">
          Don’t have an account?
          <Link
            to="/signup"
            className="pl-2 text-[14px] font-semibold uppercase text-primary"
          >
            SIGNUP HERE!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
