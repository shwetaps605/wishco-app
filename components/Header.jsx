'use client'
import Link from "next/link";
import { usePathname  } from "next/navigation";

const navLinks = [
    {
        href: '/company',
        label: 'companies'
    },
    {
        href: '/jobs',
        label: 'jobs'
    }
]

const Header = () => {
    const pathname = usePathname();
    return(
        <div className="flex flex-row justify-between items-center bg-base-300 w-full py-5 px-10 bg-opacity-85">
            <div>
                <h1 className="text-accent font-medium text-2xl italic font-serif ">wishco</h1>
                <h3 className="text-xs text-secondary text-center">
                   your<span><span className="text-accent font-medium"> wish</span>listed</span> 
                   <p><span className="text-accent font-medium">co</span>mpanies</p>
                </h3>
            </div>

            <ul className="flex flex-row gap-5 ">
                {navLinks.map(navlink => {
                    const isActive = pathname.includes(navlink.href);
                    console.log("PATTHNAME-->", pathname.toString().slice(1,navlink.href.length), "NAV HREF-->",navlink.href.toString().slice(1,navlink.href.length))
                    return (
                        <li className={`hover:underline underline-offset-8 ${isActive ? "text-accent" : "text-secondary"} text-lg`}>
                           <Link href={navlink.href} >{navlink.label}</Link>
                        </li>
                    )
                    
                })}
            </ul>
        </div>
    )

}

export default Header