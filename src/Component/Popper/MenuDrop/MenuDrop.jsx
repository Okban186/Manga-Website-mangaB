import classNames  from "classnames/bind";
import css from "./MenuDrop.module.scss"
import Tippy from "@tippyjs/react/headless";
import PopperWrapper  from "../Wrapper";
import Button from "../../Button/Button";
import MenuItem from "./MenuItem";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

const cx = classNames.bind(css)

const menuItems = [
    {title : "Login", to:"/auth"},
    {title : "Sign Up", to:"/auth?mode=signup"},
    {title : "Downloaded Books", to:"/" ,separate: true}
]

function MenuDrop({children, classname}){

    const tippyRef = useRef();

    const handleHideTippy = () =>{
        tippyRef.current.hide();
    }

    const renderItem= () =>{
        return menuItems.map((item, index) =>{
            return <MenuItem classNames={"menu-item"} data={item} key={index} onclick={handleHideTippy}></MenuItem>
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
            <div className={cx("menu-list")} tabIndex={-1} { ...attrs}>
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