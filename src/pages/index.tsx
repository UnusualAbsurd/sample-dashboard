import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "../components/ui/Container";
import { invite, PageProps } from "../typings/types";
import Link from "next/link";

export default function Home({ user }: PageProps) {
  const router = useRouter();

  const [mobile, setMobile] = useState(false);

  const handleResize = () => {
    setMobile(document.documentElement.clientWidth < 900);
  };

  useEffect(() => {
    if (router.query.r) {
      location.replace("/");
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Container title="Home" user={user}>
        <div className="flex justify-center items-center mt-32 lg:mt-32">
          <div className="flex flex-col items-center space-y-5 bg-white rounded-md ml-5 px-5 py-3">
            <div className="flex flex-col items-center max-w-3xl text-center">
              <h1 className="text-6xl sm:text-6xl md:text-7xl font-bold text-main-500 dark:text-white">
                Catter
              </h1>{" "}
              <p className="text-lg md:text-xl max-w-lg md:max-w-xl text-center text-main-600">
                Your average utility bot.
              </p>
            </div>
            <Link href={invite()} passHref>
              <button className="bg-main-300 rounded-md px-3 py-2 text-light-200 flex flex-col text-center items-center hover:bg-main-400">
                Add to server
              </button>
            </Link>
          </div>
        </div>
        <br />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function indexRoute({ req }) {
    const { user } = req.session;

    return {
      props: user ? { user } : {},
    };
  },
  {
    password: process.env.COOKIE_SECRET as string,
    cookieName: "c-session",
    ttl: 15 * 24 * 3600,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: true,
    },
  }
);
