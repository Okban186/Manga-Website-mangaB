import Footer from "./component/Footer/Footer"
import Header from "./component/Header/Header"

function DefaultLayout({children}){
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default DefaultLayout