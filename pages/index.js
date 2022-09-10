import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  })
  return (
    <div className='bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll space-y-3 md:space-y-6'>
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <button onClick={signOut}>SignOut</button> */}
      <Header />

      <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
        <div className='flex flex-col md:flex-row gap-5'>

          {/* Sidebar */}
          <Sidebar />

          {/* Feed */}


        </div>
        {/* Widgets */}


      </main>

    </div>
  )
}

export async function getServerSideProps(context) {
  //Check if the user is authenticated or not
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}