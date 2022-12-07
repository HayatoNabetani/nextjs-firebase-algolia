import Image from "next/image";
import Link from "next/link";

const links = [
    {
        label: "ホーム",
        path: "/",
    },
    {
        label: "検索",
        path: "/search",
    },
    {
        label: "設定",
        path: "/settings",
    },
];

const Footer = () => {
    return (
        <footer className="bg-slate-200 py-4 mt-10">
            <div className="container">
                <div className="mb-6">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            width={218}
                            height={40}
                            alt="logo"
                        />
                    </Link>
                </div>
                <div>
                    <h2 className="mb-3 text-slate-600">メニュー</h2>
                    <ul className="space-y-2">
                        {links.map((link) => {
                            return (
                                <li key={link.label}>
                                    <Link
                                        href={link.path}
                                        className="hover:text-blue-500"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <p className="mt-4 text-slate-500">©︎ 2022 test</p>
            </div>
        </footer>
    );
};

export default Footer;
