import Link from "next/link";

export default function Header(){
    return(
        <header className="mx-10">
            <Link href="/">
                <img src="/fwd-logo.svg" className="w-auto h-30 cursor-pointer" alt="FWD Logo"></img>
            </Link>
        </header>
    );
}