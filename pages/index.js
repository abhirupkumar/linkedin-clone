import Head from 'next/head'
import { AnimatePresence } from "framer-motion";
import Image from 'next/image'
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Header from '../components/Header';
import Modal from "../components/Modal";
import Sidebar from '../components/Sidebar';
import { getSession, useSession } from "next-auth/react";
import Feed from '../components/Feed';
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtoms";
import { connectToDatabase } from '../util/mongodb';
import Widgets from '../components/Widgets';

export default function Home({ posts, articles }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
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
        <link rel="icon" href="https://rb.gy/dpmd9s" />
      </Head>
      <Header />

      <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
        <div className='flex flex-col md:flex-row gap-5'>

          {/* Sidebar */}
          <Sidebar />

          {/* Feed */}
          <Feed posts={posts} />

        </div>
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>

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

  //Get posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db.collection("post").find().sort({ timestamp: -1 }).toArray();

  //Get Google News API
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      session,
      articles: results.articles,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      }))
    },
  };
}