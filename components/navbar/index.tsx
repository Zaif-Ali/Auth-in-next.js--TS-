import { NextPage } from "next";
import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import { useTheme } from "next-themes";
import { BsFillMoonFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { BsSun } from "react-icons/bs";

import Link from "next/link";
import { LoginBaseditems, navitems } from "../../Data/Navitems";

interface Props {}
const Navbar: NextPage<Props> = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [ThemeName, setThemeName] = useState<String>();

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setThemeName(currentTheme);
  }, []);

  // theme change button
  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <BsSun
          className="w-5 h-5 text-yellow-300 "
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <BsFillMoonFill
          className="w-5 h-5 text-gray-900 "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };
  // Menu toggle
  const Toggle = () => {
    let element = document.getElementById("navbar");
    if (element !== null) {
      element.classList.toggle("hidden");
    }
  };
  return (
    <div className="top-0 sticky bottom-0 ">
      <nav className="bg-gray-50 border dark:border-0 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 ">
        <div className="container flex flex-wrap items-center justify-between mx-auto ">
          <Link href={"/"}>
            <a className="self-center text-xl font-semibold whitespace-nowrap dark:text-gray-50 ">
              IC
            </a>
          </Link>
          <div className="flex justify-center items-center">
            <span className=" md:hidden">{renderThemeChanger()}</span>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open Navbar</span>
              <AiOutlineMenu
                className="w-6 h-6 text-purple-700"
                type="button"
                onClick={Toggle}
              />
            </button>
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar">
            <ul className="flex flex-col space-y-2 md:space-y-0 p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-gray-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navitems.map((item) => {
                return (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <a
                        className="block py-2 pl-3 pr-4 text-white bg-purple-600 opacity-80 rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-gray-50"
                        aria-current="page"
                      >
                        {item.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
              {LoginBaseditems.map((item) => {
                return (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <a
                        className="block py-2 pl-3 pr-4 text-white bg-purple-600 opacity-80 rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-gray-50"
                        aria-current="page"
                      >
                        {item.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
              
              <li className="hidden md:block">{renderThemeChanger()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
