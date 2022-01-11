import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="bg-light-200  dark:bg-dark-400 font-inter">
        <div className="flex justify-center">
          <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-72 space-y-4 lg:space-y-0 p-14 items-center">
            <div className="flex items-center space-x-4">
              <Image
                src={"/catter.png"}
                className="w-8 bg-transparent rounded-full"
                alt="Logo"
                width={100}
                height={100}
              />
              <div className="flex flex-col -space-y-1">
                <h2 className="text-main-300 dark:text-light-200 text-2xl font-bold font-montserrat">
                  Catter
                </h2>
                <span className="text-md text-gray-400">
                  Copyright © {new Date().getFullYear()} Catter
                </span>
                <span data-ccpa-link="1"></span>
              </div>
            </div>
            <div className="flex space-x-6 lg:space-x-12">
              <div className="flex flex-col space-y-0">
                <a
                  className="text-dark-100 dark:text-gray-300 hover:text-main-200 dark:hover:text-white cursor-pointer"
                  href="https://github.com/UnusualAbsurd"
                >
                  Author
                </a>
                <Link href="/commands" passHref>
                  <span className="text-dark-100 dark:text-gray-300 hover:text-main-200 dark:hover:text-white cursor-pointer">
                    Commands
                  </span>
                </Link>
                <Link href="https://discord.gg/mK5y72GSbY" passHref>
                  <span className="text-dark-100 dark:text-gray-300 hover:text-main-200 dark:hover:text-white cursor-pointer">
                    Icons
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
