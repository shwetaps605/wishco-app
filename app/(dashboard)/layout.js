
import Header from '../../components/Header'

const layout = ({children}) => {
    return (
        <div className='bg-base-200 min-h-screen'>
        <Header/>
        <div className='px-20 py-8'>
            {children}
        </div>
        </div>
        
    );
}

export default layout