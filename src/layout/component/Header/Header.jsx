import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import css from "./Header.module.scss"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons"
import MenuDrop from "../../../Component/Popper/MenuDrop/MenuDrop"
import Button from "../../../Component/Button/Button"
import { paths } from "../../../routes/PathRoutes"
import Search from "../Search/Search"
const cx = classNames.bind(css)

function Header(){
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("leftPane")}>
                    <Link to="/">ĐĂNG TRUYỆN</Link>
                    <Link to="/">ỦNG HỘ</Link>
                </div>
                <Link to={paths.home} className={cx("homeDirection")}>MANGAB</Link>
                <div className={cx("action")}>
                    <Search />
                    <MenuDrop><Button circle ><FontAwesomeIcon icon={faBars} /></Button></MenuDrop>
                </div>
            </div>

        </div>
    )
}

export default Header