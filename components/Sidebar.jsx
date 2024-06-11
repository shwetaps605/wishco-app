import NavLinks from "./NavLinks"
import MemmberProfile from "./MemberProfile"

const Sidebar = () => {
    return(
        <div className="bg-base-300 min-h-full min-w-50 px-4 grid grid-rows-[1fr,auto,1fr] gap-4">
            <div className="mb-4">
                <h2 className="text-xl text-info">wishco</h2>
            </div>
            <NavLinks/>
            <MemmberProfile/>
        </div>
    )
}

export default Sidebar