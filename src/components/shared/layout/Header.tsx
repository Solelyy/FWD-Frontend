import Link from "next/link";
import { ModeToggle } from "@/components/shared/providers/mode-toggle";

export default function Header(){
    return(
        <header className="mx-auto mt-4 w-fit flex items-center justify-between gap-10 pl-8 pr-6 py-2 border border-black/10 dark:border-white/20 rounded-full bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.8)] dark:ring-1 dark:ring-white/10">                
            <Link href="/">
                <img src="/assets/logo/fwd-logo.svg" className="w-auto h-9 cursor-pointer transition-all duration-300 hover:opacity-80" alt="FWD Logo" />
            </Link>
            <ModeToggle />
        </header>
    );
}