import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="py-4">
            <div className="flex items-center h-16 border-b container">
                <Link href="/">
                    <Image src="/logo.svg" width={218} height={40} alt="logo" />
                </Link>
                <span className="flex-1"></span>
                {/* ↑これおもろいな */}
                <span className="bg-slate-300 rounded-full w-9 h-9"></span>
            </div>
        </header>
    );
};

export default Header;
