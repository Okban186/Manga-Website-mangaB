import classNames  from "classnames/bind";
import css from "./MenuDrop.module.scss"
import Tippy from "@tippyjs/react/headless";
import PopperWrapper  from "../Wrapper";
import Button from "../../Button/Button";
import MenuItem from "./MenuItem";
import { useRef } from "react";
import useLogout from "../../../hooks/useLogout";

const cx = classNames.bind(css)



function MenuDrop({children, classname, styles, classNamesBtn, menuItems }){

    const tippyRef = useRef();
    const logout = useLogout()

    const handleHideTippy = () =>{
        tippyRef.current.hide();
    }


    const renderItem= () =>{
        return menuItems.map((item, index) =>{
            return <MenuItem classNames={cx("menu-item")} data={item} key={index} onclick={() =>{
                handleHideTippy();
                if(item.title == "Logout")
                    logout()
             }}></MenuItem>
        })
    }

    return (
        <Tippy
        placement="bottom-end"
        interactive={true}
        trigger="click"
        //appendTo={document.body}
        offset={[12, 5]}
        hideOnClick={true}
        onCreate={(instance) => (tippyRef.current = instance)}
        render={(attrs) =>(
            <div style={{styles}} className={cx("menu-list")} tabIndex={-1} { ...attrs}>
                <PopperWrapper classname={"menu-popper"}>
                    <div className={cx("menu-body")}>{renderItem()}</div>
                </PopperWrapper>
            </div>
        )}
        >
            {children}
        </Tippy>
    )
}

export default MenuDrop