
import SidebarHeader from "./SidebarHeader"
import NavLinks from "./NavLinks"
import MemberProfile from "./MemberProfile"

const Sidebar = () => {
    return(
        <div className="px-4 bg-base-200 py-12 grid">
            <SidebarHeader/>
            <NavLinks/>
            <MemberProfile/>
        </div>
    )
}

export default Sidebar