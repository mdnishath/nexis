import React, { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export const Form = () => {
  let navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [fName, setFname] = useState("");
  const [fNameError, setFnameError] = useState("");
  const [lName, setLname] = useState("");
  const [lNameError, setLnameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlefName = (e) => {
    setFname(e.target.value);
    setFnameError("");
  };
  const handlelName = (e) => {
    setLname(e.target.value);
    setLnameError("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setPhoneError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  //Step one velidation
  const handleStepOne = () => {
    if (!fName) {
      setFnameError("First Name Required");
    }
    if (!lName) {
      setLnameError("Last Name Required");
    }
    if (fName && lName) {
      setPage((prev) => prev + 1);
    }
  };
  const handleStepTow = () => {
    if (!phone) {
      setPhoneError("Phone Required");
    }
    if (!email) {
      setEmailError("Email Required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        setEmailError("Invalide email");
      }
    }
    if (
      phone &&
      email &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setPage((prev) => prev - 1);
  };

  const handleSubmite = async () => {
    if (password.length >= 8) {
    } else {
      setPasswordError("Your password must be 8 character");
    }

    if (
      fName &&
      lName &&
      phone &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email) &&
      password.length >= 8
    ) {
      const userInfo = {
        first_name: fName,
        last_Name: lName,
        phone_number: phone,
        email: email,
        password: password,
      };
      setLoading(true);
      const res = await axios.post(
        "https://test.nexisltd.com/signup",
        userInfo
      );
      console.log(res.status);
      console.log(res);
      if (res.status === 200) {
        setLoading(false);
        setFname("");
        setLname("");
        setPhone("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    }
  };

  // console.log(page, fNameError, lNameError);
  return (
    <>
      <div className=" w-full md:w-[516px] md:h-[630px] md:mx-0 md:mr-[35px] py-10 my-[19px] shadow-all md:pt-[109px] md:pb-[61px] rounded">
        <h3 className="font-inter font-semibold text-center text-xl mb-[100px]">
          Signup Form
        </h3>
        {page === 0 && (
          <div className="flex flex-col gap-y-[64px] px-[74px]">
            <div className="w-full">
              <input
                className="w-full outline-none border-b border-border pl-4"
                type="text"
                placeholder="Write First Name"
                onChange={(e) => handlefName(e)}
                value={fName}
              />
              <p className="text-red-500">{fNameError && fNameError}</p>
            </div>
            <div className="w-full">
              <input
                className="w-full outline-none border-b border-border pl-4"
                type="text"
                placeholder="Write Last Name"
                onChange={(e) => handlelName(e)}
                value={lName}
              />
              <p className="text-red-500">{lNameError && lNameError}</p>
            </div>
          </div>
        )}
        {page === 1 && (
          <div className="flex flex-col gap-y-[64px] px-[74px]">
            <div className="w-full">
              <input
                className=" outline-none border-b border-border pl-4 w-full"
                type="number"
                placeholder="1xxxxxxxx"
                onChange={(e) => handlePhone(e)}
                value={phone}
              />
              <p className="text-red-500">{phoneError && phoneError}</p>
            </div>
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
          </div>
        )}
        {page === 2 && (
          <div className="flex flex-col gap-y-[64px] px-[74px]">
            <input
              className=" outline-none border-b border-border pl-4"
              type="password"
              placeholder="xxxxxxxx"
              onChange={(e) => handlePassword(e)}
              value={password}
            />
            <p className="text-red-500">{passwordError && passwordError}</p>
          </div>
        )}
        <div className="flex justify-center mt-[68px] mb-[113px] gap-x-20">
          {page === 0 ? (
            <button
              onClick={handleStepOne}
              className="flex items-center px-5 py-[15px] bg-primary font-medium text-sm text-white rounded-[15px] gap-x-[10px]"
            >
              Next Step <HiOutlineArrowRight className="text-[20px]" />
            </button>
          ) : (
            <>
              {page === 2 ? (
                <>
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
                    <>
                      <p
                        onClick={handleBack}
                        className="flex items-center font-bold cursor-pointer"
                      >
                        Back
                      </p>
                      <button
                        onClick={handleSubmite}
                        className="flex items-center px-5 py-[15px] bg-primary font-medium text-sm text-white rounded-[15px] gap-x-[10px]"
                      >
                        Signup
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p
                    onClick={handleBack}
                    className="flex items-center font-bold cursor-pointer"
                  >
                    Back
                  </p>
                  <button
                    onClick={handleStepTow}
                    className="flex items-center px-5 py-[15px] bg-primary font-medium text-sm text-white rounded-[15px] gap-x-[10px]"
                  >
                    Next Step
                  </button>
                </>
              )}
            </>
          )}
        </div>
        <div>
          <p className="text-center text-xs">
            Already have an account?
            <Link
              to="/login"
              className="pl-2 text-[14px] font-semibold uppercase text-primary"
            >
              LOGIN HERE!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
