import { useContext } from "react"
import Footer from "../component/Footer/Footer"
import Header from "../component/Header/Header"
import { DefaultLayoutContext } from "../../Component/DefaultLayoutProvider/DefaultLayoutProvider"
import classNames from "classnames/bind"
import styles from "./DefaultLayout.module.scss"

const cx = classNames.bind(styles)

function DefaultLayout({ children, position_non_fix, sentinal, transparent_header }) {

  const { backgroundColor } = useContext(DefaultLayoutContext)

  return (
    <div className={cx("wrapper")} style={{ backgroundColor }}>
      <Header transparent_header={transparent_header} sentinal={sentinal} position_non_fix={position_non_fix} />
      <main className={cx("mainnn")}>{children}</main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
