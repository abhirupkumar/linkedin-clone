import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import HeaderLink from "./HeaderLink";
import { useTheme } from 'next-themes';
import { motion } from "framer-motion";

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
};

const Header = () => {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme, theme } = useTheme();

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), []);
    return (
        <header className='sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-0 px-3 focus-within:shadow-lg'>
            <div className="flex items-center space-x-2 w-full max-w-xs px-2">
                {mounted && (
                    <>
                        {resolvedTheme === "dark" ? (
                            <Image src="https://rb.gy/bizvqj" width={45} height={45} />
                        ) : (
                            <Image src="https://rb.gy/dpmd9s" width={45} height={45} />
                        )}
                    </>
                )}

                <div className='flex items-center rounded py-2.5'>
                    <SearchRoundedIcon className=' absolute lg:bg-[#eef3f8] dark:bg-transparent dark:md:bg-gray-700 rounded-sm lg:text-lg  ml-4 flex justify-center lg:text-gray-600 dark:text-white text-gray-700' />
                    <input type="text" className='hidden md:inline-flex bg-[#eef3f8] dark:bg-transparent dark:md:bg-gray-700 text-sm w-full font-[400] pl-[40px] py-0 rounded-sm h-[34px] placeholder-black/70 focus:outline-none dark:placeholder-white/75 flex-grow' placeholder='Search' />
                </div>
            </div>
            <div className="flex items-center space-x-6">
                <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
                <HeaderLink Icon={GroupIcon} text="My Network" feed />
                <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
                <HeaderLink Icon={ChatIcon} text="Messaging" feed />
                <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
                <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
                <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

                {/* Dark mode toggle */}
                {mounted && (<div className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${resolvedTheme === "dark" ? "justify-end" : "justify-start"
                    }`} onClick={() =>
                        setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                >
                    <span className="absolute left-0">🌜</span>
                    <motion.div
                        className="w-5 h-5 bg-white rounded-full z-40"
                        layout
                        transition={spring}
                    />
                    <span className="absolute right-0.5">🌞</span>
                </div>)}
            </div>
        </header>
    )
}

export default Header