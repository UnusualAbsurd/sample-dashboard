import Link from "next/link";

export default function FourOFour() {
  return (
    <div className="w-full h-screen flex justify-center items-center text-center">
      <div className="flex flex-col space-y-2">
        <div className="text-light-200 text-6xl font-bold font-montserrat">
          Error!
        </div>
        <div className="font-montserrat font-bold text-white dark:text-white">
          Seems like we couldn{"'"}t load this page because it{"'"}s not a valid
          page..
        </div>
        <Link href="/" passHref>
          <button className="ml-5 px-3 py-2 inline-block drop-shadow-xl dark:drop-shadow-none text-light-300 pl-4 border border-solid border-main-500 bg-main-500 hover:bg-main-600 font-semibold rounded-md">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
