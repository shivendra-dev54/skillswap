import React from "react";
import { useNavigate } from "react-router";

interface SignInProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void; // Update the type to accept a boolean
}

const SignIn: React.FC<SignInProps> = ({ setIsLoggedIn }) => {

  const navigate = useNavigate();

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // Replace with your API endpoint
    fetch("http://localhost:64000/api/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to sign in");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sign in successful");
        setIsLoggedIn(true); // Call setIsLoggedIn with true on successful sign-in
        // Handle additional logic (e.g., redirect, save token)
        localStorage.setItem("authToken", data["token"]);
        navigate("/main_page");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setIsLoggedIn(false); // Optionally set to false on error
        // Handle error (e.g., show error message)
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-black text-white text-4xl select-none">
      <div className="w-full max-w-sm space-y-8 border-2 border-slate-400 rounded-xl p-6">
        <h1 className="text-center text-5xl font-bold">Sign In</h1>
        <form className="mt-8 space-y-6" onSubmit={formSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <p className="text-xl mt-10 text-slate-300">Email:</p>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <p className="text-xl mt-10 text-slate-300">Password:</p>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
