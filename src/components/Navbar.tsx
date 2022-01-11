import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "../typings/types";
import { Avatar } from "./Avatar";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";

interface Props {
  user?: User;
}

export default function Navbar({ user }: Props) {
  const [hamburger, setHamburger] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAccountExpanded, setMobileAccountExpanded] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = hamburger ? "hidden" : "auto";
  }, [hamburger]);

  useEffect(() => {
    function handleResize() {
      setHamburger(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center text-lg">
        <nav className="max-w-7xl drop-shadow-xl dark:drop-shadow-none bg-light-200 dark:bg-dark-200 lg:rounded-md flex justify-between p-4 mt-0 lg:mt-5 w-full lg:w-11/12 z-[1]">
          <div className="flex items-center">
            <Image
              className="w-8 bg-transparent rounded-full"
              src={"/catter.png"}
              alt="Logo"
              width={42}
              height={42}
              onClick={() => location.replace("/")}
            />
            <ul className="ml-5 space-x-4 hidden lg:flex">
              <li className="inline-block text-gray-800 dark:text-light-200 hover:text-main-300 dark:hover:text-main-100">
                <Link href="/commands">Commands</Link>
              </li>
              <li className="inline-block text-gray-800 dark:text-light-200 hover:text-main-300 dark:hover:text-main-100">
                <Link href="/dashboard">Dashboard</Link>
              </li>
            </ul>
            <div className="ml-4 text-xl font-montserrat font-bold inline-block lg:hidden text-gray-800 dark:text-light-200">
              Catter
            </div>
          </div>

          <div className="items-center relative hidden lg:flex">
            {!user && (
              <Link href="/api/auth/login" passHref>
                <button className="ml-5 px-3 py-2 inline-block drop-shadow-xl dark:drop-shadow-none text-light-300 pl-4 border border-solid border-indigo-500 bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-md">
                  Login with Discord
                </button>
              </Link>
            )}
            {user && (
              <div
                className="pl-4 h-full flex items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Dropdown
                  content={
                    <div className="flex items-center space-x-2 p-2">
                      <Avatar link={user.avatar} width={32} height={32} />
                      <div className="text-dark-400 dark:text-white">
                        {user.username}#{user.discriminator}{" "}
                        <Image
                          src={dropdownOpen ? "/uparrow.svg" : "/downarrow.svg"}
                          alt="Up Arrow SVG"
                          width={14}
                          height={14}
                          className=" transition-transform"
                        />
                      </div>
                    </div>
                  }
                  options={[
                    {
                      label: "Logout",
                      link: "/api/auth/logout",
                      variant: "danger",
                    },
                  ]}
                />
              </div>
            )}
          </div>
          <div
            className="items-center relative flex lg:hidden cursor-pointer select-none text-main-500 dark:text-light-100"
            onClick={() => setHamburger(!hamburger)}
          >
            {!hamburger ? (
              <>
                <span className="text-white dark:text-white hover:text-white border ml-5 px-3 py-2 rounded-md pl-4 border-solid border-main-500 bg-main-500 hover:bg-main-600">
                  Menu
                </span>
              </>
            ) : (
              <span className="text-white dark:text-white hover:text-white border ml-5 px-3 py-2 rounded-md pl-4 border-solid border-rose-500 bg-rose-500 hover:bg-rose-600">
                Close Menu
              </span>
            )}
          </div>
        </nav>
        {hamburger && (
          <ul className="absolute flex flex-col bg-light-200 dark:bg-dark-200 box-border w-screen h-screen z-[9999999] px-6 top-[74px]">
            <Link href="/commands" passHref>
              <li className="text-dark-400 dark:text-white hover:text-light-600 pt-5 ">
                Commands
              </li>
            </Link>
            <Link href="/dashboard" passHref>
              <li className="text-dark-400 dark:text-white hover:text-light-600 pt-5">
                Dashboard
              </li>
            </Link>
            <br />
            {user ? (
              <div className="mt-5 pt-5 border-t-[1px] border-main-600">
                <div
                  className="flex items-center justify-between w-full select-none "
                  onClick={() =>
                    setMobileAccountExpanded(!mobileAccountExpanded)
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Avatar
                      link={user.avatar}
                      width={46}
                      height={46}
                      className="w-7 background-transparent rounded-full"
                    />
                    <h3 className="text-xl italic text-main-500 font-semibold leading-none">
                      {user.username}#{user.discriminator}
                    </h3>
                  </div>
                </div>
                <div
                  id="account-links"
                  className="pl-3 mb-5 overflow-hidden transition-all ease"
                  style={{
                    height: mobileAccountExpanded
                      ? user.moderator
                        ? "144px"
                        : "96px"
                      : "0px",
                  }}
                ></div>
                <Button
                  variant="danger"
                  size="medium"
                  block
                  href="/api/auth/logout"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/api/auth/login" passHref>
                  <button className="ml-5 px-3 py-2 inline-block drop-shadow-xl dark:drop-shadow-none text-light-300 pl-4 border border-solid border-indigo-500 bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-md">
                    Login with Discord
                  </button>
                </Link>
                <br />
              </>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
