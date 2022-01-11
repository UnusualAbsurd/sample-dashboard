import { NextSeo } from "next-seo";
import { ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { User } from "../../typings/types";
import Footer from "../Footer";
import Navbar from "../Navbar";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: ReactNode;
  title?: string;
  user?: User;
  description?: string;
}

export default function Container({
  children,
  title,
  user,
  description,
}: Props) {
  const [domain, setDomain] = useState("");

  useEffect(() => {
    setDomain(window.origin);
  }, []);

  return (
    <>
      {title && (
        <NextSeo
          title={`${title} - Catter`}
          additionalLinkTags={[
            {
              rel: "icon",
              href: "/img/circlecat.png",
            },
          ]}
          additionalMetaTags={[
            {
              property: "og:title",
              content: `${title} - Catter`,
            },
            {
              property: "og:type",
              content: "website",
            },
            {
              property: "og:url",
              content: `${domain}/${title}`,
            },
            {
              property: "og:image",
              content: `/catter.png`,
            },
            {
              property: "og:description",
              content: description
                ? description
                : `Catter is your average utility discord bot. Made using typescript btw. 🐈`,
            },
            {
              name: "theme-color",
              content: "#2F3136",
            },
          ]}
        />
      )}
      <ToastContainer />
      <div className="flex flex-col h-screen justify-between">
        <Navbar user={user} />
        <div className="flex justify-center mx-8">
          <div className="max-w-7xl relative w-full">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
