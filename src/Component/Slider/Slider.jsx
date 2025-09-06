import { useState } from "react"
import styles from "./Slider.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)
//mmb vcl
export default function Slider({items, className, changeHeroBackground, data}){


    
    const [current, setCurrent] = useState(0)
    const handleClickDot = (index) =>{
        setCurrent(index)
        changeHeroBackground(data.data[index].backgroundImg)
    }

    const nextItem = () => setCurrent(prev => (prev+ 1)% items.length);
    const prevItem = () => setCurrent(prev => (prev - 1 + items.length) % items.length)

    const generateItemSlider = () =>{
        return items.map((item, index) => (
            <div style={{ transform: `translateX(calc( -${current * 100}% - ${current} * 20px))` }} key={index} className={cx("slide", `${index == current ? "active" : "inactive"}`)}>
                {item}
            </div>
        ))
    }

    const generateDotIndicator = () => {
        return items.map((_, index) => (
            <span
            key={index}
            className={cx("dot", `${index == current ? "active" : ""}`)}
            onClick={() => handleClickDot(index)}
          ></span>
        ))
    }

    return (
        <div className={cx("slider")} >
            <div className={cx("slides")} >{generateItemSlider()}</div>

            <div className={cx("dots")}>
                {generateDotIndicator()}
            </div>
        </div>

    )
}