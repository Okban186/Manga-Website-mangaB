import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import css from "./Header.module.scss"
import classNames from "classnames/bind"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import MenuDrop from "../../../Component/Popper/MenuDrop/MenuDrop"
import Button from "../../../Component/Button/Button"
import { paths } from "../../../routes/PathRoutes"
import Search from "../Search/Search"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider"
const cx = classNames.bind(css)


const menuItems = [
    {title : "Login", to:"/auth"},
    {title : "Sign Up", to:"/auth?mode=signup"},
    {title : "Downloaded Books", to:"/" ,separate: true}
]

const menuItemsUser = [
    {title : "Followed Books", to:"/"},
    {title: "Logout"},
    {title : "Downloaded Books", to:"/" ,separate: true}
]



function Header({position_non_fix = false}){

    const location = useLocation()
    const sentinelRef = useRef(null)
    const [transparentHeader, setTransparentHeader] = useState(location.pathname === "/" || location.pathname.startsWith("/chapters"))
    

    useEffect(() =>{
        if(location.pathname != "/" && !location.pathname.startsWith("/chapters") && !transparentHeader) return
        const observe = new IntersectionObserver(
            ([entry]) => {
                if(location.pathname != "/" && !location.pathname.startsWith("/chapters")) setTransparentHeader(false)
                else setTransparentHeader(entry.isIntersecting)
            }
        )
        if(sentinelRef.current)
            observe.observe(sentinelRef.current)

        return () =>{
            if(sentinelRef.current)
                observe.disconnect()
        }
    })
    

    const {isLogin} = useContext(AuthContext)
    const userDetail = useMemo(() =>{
        if(!isLogin) return;
        return JSON.parse(localStorage.getItem("User Detail"))
    },[isLogin])
        
    

    return (
        <>
        <div ref={sentinelRef} className={cx("sentinel")} />
        <div className={cx("wrapper",{transparentHeader},{position_non_fix})}>
            <div className={cx("inner")}>
                <div className={cx("leftPane")}>
                    <Link to="/">ĐĂNG TRUYỆN</Link>
                    <Link to="/">ỦNG HỘ</Link>
                </div>
                <Link to={paths.home} className={cx("homeDirection")}>MANGAB</Link>
                <div className={cx("action")}>
                    <Search classNamesBtn={cx(transparentHeader ? "change_default_color_out_com" : "default_color_out_com")} />
                    <MenuDrop menuItems={isLogin ? menuItemsUser : menuItems}><Button className={cx(transparentHeader ? "change_default_color_out_com" : "default_color_out_com")} circle >{isLogin ? userDetail?.username[0].toUpperCase() : <FontAwesomeIcon icon={faBars} />}</Button></MenuDrop>
                </div>
            </div>

        </div>
        </>
    )
}

export default Header