import React from "react";

const SignUp = () => {
  
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // Replace with your API endpoint
    fetch("/api/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to sign in");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sign up successful:", data);
        // Handle successful sign-in (e.g., redirect, save token)
      })
      .catch((error) => {
        console.error("Error SignUp:", error);
        // Handle error (e.g., show error message)
      });
  }



    return (
      <div className="min-h-full flex items-center justify-center bg-black text-white text-4xl select-none">
        <div className="w-full max-w-sm space-y-8 border-2 border-slate-400 rounded-xl p-6">
          <h1 className="text-center text-5xl font-bold">Sign Up</h1>
          <form
            className="mt-8 space-y-6"
            onSubmit={formSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">

              {/* Email address */}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <p className="text-xl mt-10 text-slate-300">
                  Username:
                </p>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete=""
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="username"
                />
              </div>



              {/* Email address */}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <p className="text-xl mt-10 text-slate-300">
                  Email:
                </p>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              {/* password */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <p className="text-xl mt-10 text-slate-300">
                  Password:
                </p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default SignUp;
  