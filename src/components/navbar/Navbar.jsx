import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../../store/authSlice";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const Navbar = () => {
  const { token } = useSelector((store) => store.auth);
  const [value, setValue] = useState("");
  const [animationPlayed, setAnimationPlayed] = useState(
    sessionStorage.getItem("navbarAnimationPlayed") === "true"
  );
  const navigate = useNavigate();

  useGSAP(() => {
    if (!animationPlayed) {
      gsap.from(".blogMs,.navImg,ul li", {
        autoAlpha: 1,
        x: -300,
        duration: 1,
        ease: "power2.out",
      });
      sessionStorage.setItem("navbarAnimationPlayed", "true");
      setAnimationPlayed(true);
    }
  });
  const dispatch = useDispatch();
  //when logout button is clicked
  const handleClearToken = () => {
    localStorage.removeItem("jwt");
    dispatch(setToken(null));
  };
  //when token state is changed or triggered
  useEffect(() => {
    if (token) {
      setValue("Logout");
    } else {
      setValue("Register");
    }
  }, [token]);
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, [value]);
  //execute on initial render
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(setToken(localStorage.getItem("jwt")));
      setValue("Logout");
      console.log("hello");
    }
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 navImg"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white blogMs">
            BlogMS
          </span>
        </Link>
        <div className="flex md:order-2">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/blog/add"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Create Blog
              </Link>
            </li>
            <li>
              {token ? (
                <Link
                  to="/"
                  onClick={handleClearToken}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {value}
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {value}
                </Link>
              )}
            </li>
            <li>
              <Link
                to="/login"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
