import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import HeaderLink from '../components/HeaderLink'
import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { getProviders, signIn } from "next-auth/react";
import { useTheme } from '@emotion/react';

const Home = ({ providers }) => {

    console.log(providers)

    return (
        <div className='space-y-10 relative bg-white dark:bg-white'>
            <Head>
                <title>LinkedIn - Log In or Sign Up</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className='flex justify-between py-4 xl:px-28'>
                <div className='relative w-36 h-10 ml-0'>
                    <Image src="https://rb.gy/vtbzlp" layout="fill" objectFit="contain" alt='' />
                </div>
                <div className='flex items-center sm:divide-x sm:divide-gray-300'>
                    <div className='hidden md:flex space-x-8 pr-4'>
                        <HeaderLink Icon={ExploreIcon} text="Discover" />
                        <HeaderLink Icon={GroupIcon} text="People" />
                        <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
                        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
                    </div>

                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <div className="pl-4">
                                <button
                                    className="text-blue-700 font-semibold border border-blue-700 hover:bg-teal-50 rounded-full px-6 py-3 translate-all"
                                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>))}
                </div>
            </header>
            <main className='flex flex-row xl:flex-col justify-around sm:justify-center sm:items-center max-w-screen-lg pt-[10px]'>
                <div className="space-y-6 xl:space-y-7 sm:ml-10 lg:w-[60%] xl:-ml-32">
                    <h1 className='text-4xl md:h1-text font-light text-[#8f5849] !loading-snug pl-4 xl:pl-0'>Welcome to your professional community.</h1>
                    <div className="space-y-4 ">
                        <div className="intent xl:mx-0 w xs:w-full">
                            <h2 className="text-xl">Search for a job</h2>
                            <ArrowForwardIosRoundedIcon className="text-gray-700" />
                        </div>
                        <div className="intent xl:mx-0">
                            <h2 className="text-xl">Find a person you know</h2>
                            <ArrowForwardIosRoundedIcon className="text-gray-700" />
                        </div>
                        <div className="intent xl:mx-0">
                            <h2 className="text-xl">Learn a new skill</h2>
                            <ArrowForwardIosRoundedIcon className="text-gray-700" />
                        </div>
                    </div>
                    <div className="relative xl:absolute w-80 h-80 xl:w-[700px] xl:h-[560px] top-24 md:-right-20 rounded-full">
                        <Image src="https://rb.gy/vkzpzt" layout='fill' priority alt='' />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home

export async function getServerSideProps(context) {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}