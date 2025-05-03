import { Link } from "react-router";

const Homepage = () => {
    return (
      <div className="min-h-full flex flex-col items-center justify-center bg-slate-950 text-white select-none">
        <p className="text-9xl glow-text">Skillswap</p>

        <p className="mt-40 text-center text-2xl">
          A platform for exchanging skills
          <br/>
          Connect with people, share knowledge, and learn new skills.
          <br/>
          Join our community and start your skill-swapping journey today!
        </p>
        
        <div className="w-full flex justify-end mt-20">
          <Link to="/signin" className="p-3 pr-6 pl-6 mr-6 border-2 border-slate-700 rounded-full bg-slate-900 hover:bg-slate-950 hover:border-slate-600 cursor-pointer">Get started</Link>
        </div>
      </div>
    );
  };
  
  export default Homepage;
  