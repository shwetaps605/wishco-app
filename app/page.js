import { redirect } from "next/navigation";

const HomePage = async () => {
    console.log('HOME PAGE')
    redirect('/company')
}

export default HomePage;