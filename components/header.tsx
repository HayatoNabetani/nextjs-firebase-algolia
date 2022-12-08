import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/auth";
import Sidebar from "./sidebar";
import UserMenu from "./user-menu";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Header = () => {
    const { user, isLoading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    if (isLoading) {
        return null;
    }

    const closeModal = () => {
        setIsSidebarOpen(false);
    };

    const openModal = () => {
        setIsSidebarOpen(true);
    };

    return (
        <>
            <header className="relative z-10 py-4">
                <div className="flex items-center h-16 border-b container">
                    <button className="p-2 mr-1" onClick={openModal}>
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            width={218}
                            height={40}
                            alt="logo"
                        />
                    </Link>
                    <span className="flex-1"></span>
                    {user && (
                        <Link href="/create-post" className="mr-4">
                            投稿
                        </Link>
                    )}
                    {user ? <UserMenu /> : <Link href="/login">ログイン</Link>}
                </div>
            </header>
            <Sidebar isOpen={isSidebarOpen} closeModal={closeModal} />
        </>
    );
};

export default Header;
