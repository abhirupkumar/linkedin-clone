import Head from 'next/head'
import Image from 'next/image'
import { signOut } from "next-auth/react";
import Header from '../components/Header';

export default function Home() {
  return (
    <div className=''>
      <Head>
        <title>LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <button onClick={signOut}>SignOut</button> */}
      <Header />

    </div>
  )
}
