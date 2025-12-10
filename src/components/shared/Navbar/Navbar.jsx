import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router";
import defaultAvatar from "../../../assets/default-avatar.png";
import logo from "../../../assets/fabicon/fabicon.webp";
import { useSignOut } from "../../../hooks/auth";
import { useAuth } from "../../../providers/AuthProvider";
import MainLinks from "./MainLinks";
import ProfileLinks from "./ProfileLinks";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useSignOut();
  const { fbUser, dbUser } = useAuth();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/signin");
      },
      onError: (error) => {
        toast.error(`Logout failed: ${error}`)
      },
    });
  };
  return (
    <nav className="navbar  shadow-md px-4 lg:px-8 sticky top-0 z-50 backdrop-blur-lg bg-base-100/95">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Local Bite" className="w-10 h-10" />
          <span className="text-2xl font-popins font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Local Bite
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 font-inter">
          <MainLinks />
        </ul>
      </div>

      {/* Auth Section */}
      <div className="navbar-end gap-3">
        {fbUser ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2"
            >
              <div className="w-10 rounded-full">
                <img
                  src={fbUser.photoURL || defaultAvatar}
                  alt={dbUser?.displayName}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow-xl bg-base-100 rounded-(--radius-box) w-52 border border-base-300"
            >
              <li className="menu-title">
                <span className="font-popins text-base capitalize">
                  {dbUser?.displayName}
                </span>
              </li>
              <ProfileLinks />
              <div className="divider my-1"></div>
              <li>
                <button onClick={handleLogout} disabled={isPending}>
                  <CiLogout /> {isPending ? "Logging out..." : "Logout"}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/signin"
              className="btn btn-ghost btn-sm rounded-full font-inter"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="btn btn-primary btn-sm rounded-full font-inter"
            >
              Sign Up
            </Link>
          </>
        )}

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <HiOutlineMenuAlt1 />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <MainLinks />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
