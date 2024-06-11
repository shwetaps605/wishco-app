
import Header from '../../components/Header'

const layout = ({children}) => {
    return (
        <div className='px-20 py-12 bg-base-200 min-h-screen'>
            <Header/>
            {children}
        </div>
    );
}

export default layout