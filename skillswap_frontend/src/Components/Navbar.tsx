import { Link } from "react-router";

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const Navbar = ({ isLoggedIn, setIsLoggedIn }: NavbarProps) => {
  const handleLogout = () => {
    setIsLoggedIn(false); // Set the user as logged out
  };

  return (
    <nav className="h-16 bg-black text-white flex items-center justify-center px-4 shadow-md">
      <div className="flex w-screen">
        <Link to="/" className="p-2 text-2xl text-center flex items-center">
          SkillSwap
        </Link>
        <div className="ml-auto flex">
          <Link to="/" className="p-6">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="p-6">
                Profile
              </Link>
              <button onClick={handleLogout} className="p-6">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="p-6">
                Sign In
              </Link>
              <Link to="/signup" className="p-6">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
