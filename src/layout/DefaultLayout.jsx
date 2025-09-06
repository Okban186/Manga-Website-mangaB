import Header from "./component/Header/Header"

function DefaultLayout({children}){
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default DefaultLayout