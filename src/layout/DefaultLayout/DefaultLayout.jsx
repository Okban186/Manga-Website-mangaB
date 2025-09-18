import { useContext } from "react"
import Footer from "../component/Footer/Footer"
import Header from "../component/Header/Header"
import { DefaultLayoutContext } from "../../Component/DefaultLayoutProvider/DefaultLayoutProvider"
import classNames from "classnames/bind"
import styles from "./DefaultLayout.module.scss"

const cx = classNames.bind(styles)

function DefaultLayout({children, position_non_fix}){

    const {backgroundColor} = useContext(DefaultLayoutContext)

    return (
        <div className={cx("wrapper")} style={{backgroundColor}}>
            <Header position_non_fix={position_non_fix} />
            {children}
            <Footer />
        </div>
    )
}

export default DefaultLayout