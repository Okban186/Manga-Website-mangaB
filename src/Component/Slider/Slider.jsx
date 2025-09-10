import { useEffect, useRef, useState } from "react"
import styles from "./Slider.module.scss"
import classNames from "classnames/bind"
import useResizeObserver from "../../hooks/useResizeObserver"

const cx = classNames.bind(styles)
let isCooldown = false
export default function Slider({items,
    className,
    changeHeroBackground,
    data,
    spacingVisibale = false,
    over_flow_hidden = false,
    active_each_element = false,
    slide_each_element = false,
    dots = false,
    arrow = false,
    clickCardSlide = false
}){

    const sliderRef = useRef(null)
    const slidesRef = useRef(null)

    const sliderSize = useResizeObserver(sliderRef)
    
    const [sliderProps, setSliderProps] = useState({len : items.length, sliderWidth : 0, slidesWidth : 0})
    const [current, setCurrent] = useState(0)
    const nextSlide = () => {
        if(isCooldown) return
        setCurrent((prev) => (prev + 1) % sliderProps.len);
        isCooldown = true
        setTimeout(() => (isCooldown = false), 700)
    }
    const prevSlide = () => {
        if(isCooldown) return
        setCurrent((prev) => (prev - 1 + sliderProps.len) % sliderProps.len);
        isCooldown = true
        setTimeout(() => (isCooldown = false), 700)
    }

    useEffect(() =>{
        const timeOut = setTimeout(() =>{
            if(!slidesRef.current) return
            const len = Math.ceil(slidesRef.current.scrollWidth/sliderSize.width)
            setSliderProps({len,
                sliderWidth : sliderSize.width,
                slidesWidth : slidesRef.current.scrollWidth,
            })
            setCurrent(prev => {
                if(prev == len)
                    return (prev+1)%len
                return prev%len
            })

        },600)
        return () => clearTimeout(timeOut)
    },[sliderSize])

    useEffect(() =>{
        if(changeHeroBackground)
            changeHeroBackground(data.data[current].backgroundImg)
    },[current])
    
    
    const handleChangeCurrentCard = (index) =>{
        setCurrent(index)
        if(!changeHeroBackground) return
        changeHeroBackground(data.data[index].backgroundImg)
    }


    const generateItemSlider = () =>{
        return items.map((item, index) => (
            <div 
                onClick={clickCardSlide ? () => handleChangeCurrentCard(index) : null} 
                style={{ transform: `translateX(calc( -${current * 100}% - ${current} * 20px))` }} 
                key={index} 
                className={cx("slide", `${!active_each_element ? "active" : index == current ? "active" : "inactive"}`)}>
                {item}
            </div>
        ))
    }

    const generateDotIndicator = () => {
        return items.map((_, index) => (
            <span
            key={index}
            className={cx("dot", `${index == current ? "active" : ""}`)}
            onClick={() => handleChangeCurrentCard(index)}
          ></span>
        ))
    }

    return (
        <div ref={sliderRef} className={cx("slider", className,over_flow_hidden ? "over_flow_hidden" : "")} >
            
            {slide_each_element ? 
            <div className={cx("slides")} >
                {spacingVisibale && <div className={cx("spacingVisibale-left")}/>}
                {generateItemSlider()}
                {spacingVisibale && <div className={cx("spacingVisibale-right")}/>}
            </div> : 
            <div 
                ref={slidesRef}
                style={{ transform: `translateX(calc( -${ current == sliderProps.len-1 ? sliderProps.slidesWidth - (sliderProps.sliderWidth*1)  : sliderProps.sliderWidth * current }px ))` }} 
                className={cx("slides")}>
                {items}
            </div>
            }

                {arrow && 
                    <>
                        <button className={cx("arrow","left")} onClick={prevSlide}>❮</button>
                        <button className={cx("arrow","right")} onClick={nextSlide}>❯</button>
                        
                    </>
                }
                    
          
            {dots && <div className={cx("dots")}>
                {generateDotIndicator()}
            </div>}
        </div>

    )
}