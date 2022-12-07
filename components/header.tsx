import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/auth";
import UserMenu from "./user-menu";

const Header = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    return (
        <header className="py-4">
            <div className="flex items-center h-16 border-b container">
                <Link href="/">
                    <Image src="/logo.svg" width={218} height={40} alt="logo" />
                </Link>
                <span className="flex-1"></span>
                {/* ↑これおもろいな */}
                {user ? <UserMenu /> : <Link href="/login">ログイン</Link>}
            </div>
        </header>
    );
};

export default Header;
