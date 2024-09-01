// src/components/Signup.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  const handleNextStep = () => {
    if (step === 1 && (!userName.trim() || !email.trim())) {
      setError("Please enter all details.");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if any field is empty
    if (!email.trim() || !password.trim() || !userName.trim() || !confirmPassword.trim()) {
      setError("Please enter all details.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userName }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }
      navigate("/login");
    } catch (err) {
      console.error("Error during SignUp:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-screen">
        <div className="mx-auto flex flex-col justify-center items-center font-[sans-serif] bg-white h-screen w-[100%] md:min-h-screen">
      <div className="grid md:grid-cols-2 items-center gap-y-8 max-w-7xl w-full shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] m-6 rounded-xl relative overflow-hidden">
        <div className="max-md:order-1 p-4 bg-gray-50 h-full">
          <img src="https://readymadeui.com/signin-image.webp" className="lg:max-w-[90%] w-full h-full object-contain block mx-auto" alt="login-image" />
        </div>

        <div className="flex items-center p-6 max-w-md w-full h-full mx-auto">
          <form className="w-full" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="mb-12">
                  <h3 className="text-blue-500 lg:text-3xl text-2xl font-extrabold max-md:text-center">Create an account</h3>
                </div>

                <div>
                  <label className="text-gray-800 text-sm font-semibold block mb-3">Full Name</label>
                  <div className="relative flex items-center">
                    <input name="name" type="text" required className="w-full bg-transparent text-sm text-gray-800 border-2 focus:border-blue-500 pl-4 pr-12 py-3.5 outline-none rounded-xl" placeholder="Enter name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                      <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-gray-800 text-sm font-semibold block mb-3">Email</label>
                  <div className="relative flex items-center">
                    <input name="email" type="email" required className="w-full bg-transparent text-sm text-gray-800 border-2 focus:border-blue-500 pl-4 pr-12 py-3.5 outline-none rounded-xl" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-12">
                  <h3 className="text-blue-500 lg:text-3xl text-2xl font-extrabold max-md:text-center">Set your password</h3>
                </div>

                <div>
                  <label className="text-gray-800 text-sm font-semibold block mb-3">Password</label>
                  <div className="relative flex items-center">
                    <input name="password" type="password" required className="w-full bg-transparent text-sm text-gray-800 border-2 focus:border-blue-500 pl-4 pr-12 py-3.5 outline-none rounded-xl" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-gray-800 text-sm font-semibold block mb-3">Confirm Password</label>
                  <div className="relative flex items-center">
                    <input name="confirmPassword" type="password" required className="w-full bg-transparent text-sm text-gray-800 border-2 focus:border-blue-500 pl-4 pr-12 py-3.5 outline-none rounded-xl" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
              </>
            )}

            <div className="mt-12">
              {step === 1 && (
                <button type="button" className="w-full shadow-xl py-3.5 px-8 text-sm tracking-wide font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 text-white border focus:outline-none transition-all" onClick={handleNextStep}>
                  Next Step
                </button>
              )}
              {step === 2 && (
                <button type="submit" className="w-full shadow-xl py-3.5 px-8 text-sm tracking-wide font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 text-white border focus:outline-none transition-all">
                  Sign Up
                </button>
              )}

              <div className="flex items-center justify-center gap-4 mt-12">
                <div className={`w-3 h-3 shrink-0 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-gray-300'} cursor-pointer`}></div>
                <div className={`w-3 h-3 shrink-0 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-gray-300'} cursor-pointer`}></div>
              </div>
            </div>
          </form>
        </div>
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-400 max-sm:hidden"></div>
      </div>
    </div>
    </div>
  );
};

export default Signup;