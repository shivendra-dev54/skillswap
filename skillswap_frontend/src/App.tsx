import { Routes, Route } from "react-router";
import { useState } from "react";
import Homepage from "./Pages/Homepage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SIgnUp";
import Navbar from "./Components/Navbar";
import Mainpage from "./Pages/Mainpage";
import Profile from "./Pages/Profile";
import ChatPage from "./Pages/ChatPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-950 text-white">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main_page" element={<Mainpage isLoggedIn={isLoggedIn}/>} />
          <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn}/>} />
          <Route path="/chat/:username" element={<ChatPage isLoggedIn={isLoggedIn}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
