'use client'
import Link from "next/link";
import { usePathname  } from "next/navigation";

const Header = () => {
    const currentPage = usePathname();
    console.log("params-->",currentPage)
    return(
        <div className="flex flex-row justify-between items-center mb-5">
             <h1 className="text-2xl text-secondary">
                your<span className="underline underline-offset-8"><span className="text-accent font-medium"> wish</span>listed</span> <span className="text-accent font-medium">co</span>mpanies
            </h1>
            <span className="text-2xl text-primary hover:cursor-pointer hover:underline underline-offset-8 ">
                <Link href={currentPage === '/company' ? '/jobify' : '/company'}>{currentPage === '/company' ? 'jobs' : 'companies'}</Link>
            </span>
        </div>
    )

}

export default Header