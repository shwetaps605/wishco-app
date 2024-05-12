
import { FaBarsStaggered } from 'react-icons/fa6'
import Sidebar from '../../components/SideBar'

const layout = ({children}) => {
    return (
        <div className='drawer md:drawer-open sm:drawer-open'>
            <input type='checkbox' id='my-drawer-2' className='drawer-toggle'/>
            <div className='drawer-content'>
                <div className='bg-base-100 px-8 py-12 min-h-screen'>
                    <label htmlFor='my-drawer-2' className='drawer-button md:hidden sm:hidden fixed top-6 right-6'>
                        <FaBarsStaggered className='w-8 h-8 text-primary' />
                    </label>
                    {children}
                </div>
                
            </div>
            <div className='drawer-side'>
                <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay'>
                    <Sidebar/>
                </label>
            </div>
        </div>
    );
}

export default layout