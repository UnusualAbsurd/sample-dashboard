import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FourOFour() {
  const [domain, setDomain] = useState("");

  useEffect(() => {
    setDomain(window.origin);
  }, []);

  return (
    <>
      <NextSeo
        title={`Commands - Catter`}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/img/circlecat.png",
          },
        ]}
        additionalMetaTags={[
          {
            property: "og:title",
            content: `Commands - Catter`,
          },
          {
            property: "og:type",
            content: "website",
          },
          {
            property: "og:url",
            content: `${domain}/commands`,
          },
          {
            property: "og:image",
            content: `/catter.png`,
          },
          {
            property: "og:description",
            content:
              "Get the list of commands for the bot, easily and fast. 🏃‍♂️",
          },
          {
            name: "theme-color",
            content: "#2F3136",
          },
        ]}
      />
      <div className="w-full h-screen flex justify-center items-center text-center">
        <div className="flex flex-col space-y-2">
          <div className="text-light-200 text-6xl font-bold font-montserrat">
            Whoops!
          </div>
          <div className="font-montserrat font-bold text-white dark:text-white">
            This page is currently under development, come back next time!
          </div>
          <Link href="/" passHref>
            <button className="ml-5 px-3 py-2 inline-block drop-shadow-xl dark:drop-shadow-none text-light-300 pl-4 border border-solid border-main-500 bg-main-500 hover:bg-main-600 font-semibold rounded-md">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
