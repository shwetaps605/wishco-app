
import Header from '../../components/Header'
import Footer from "../../components/Footer"

const layout = ({children}) => {
    return (
        <div className='bg-base-200 flex flex-col min-h-[100vh]'>
        <Header/>
        
        <div className='px-20 py-8 flex-grow'>
            {children}
        </div>
        <Footer/>
        </div>
        
    );
}

export default layout