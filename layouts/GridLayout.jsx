

const GridLayout = ({children}) => {
    return <div className='mt-10 grid grid-cols-[1fr,1fr,1fr] gap-5'>
        {children}
    </div>
}

export default GridLayout;