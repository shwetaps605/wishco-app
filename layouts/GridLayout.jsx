

const GridLayout = ({children}) => {
    return <div className='mt-10 grid lg:grid-cols-[1fr,1fr,1fr] md:grid-cols-[2fr,2fr] gap-5 min-h-40'>
        {children}
    </div>
}

export default GridLayout;