import classNames from "classnames/bind";
import styles from "./HeroSection.module.scss"
import Button from "../../../Component/Button/Button";
import heroData from "../../../assets/data/data.json"
import Slider from "../../../Component/Slider/Slider";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles)

function HeroSection({children}){

    const [heroBackgroundBanner, setHeroBackground] = useState(heroData.data[0].backgroundImg)
    const [updataHerobackground, setUpdateHeroBackground] = useState(heroData.data[0].backgroundImg)

    const changeHeroBackground = (background) => {
            setUpdateHeroBackground(background)
    }

    useEffect(() =>{
        const timeOut = setTimeout(() => {
            setHeroBackground(updataHerobackground)
        },500)
           return () => clearTimeout(timeOut)
    }, [updataHerobackground])

    const generateHeroBanner =() =>{


        return  heroData.data.map((data, index) =>(
                    <div key={index} className={cx("hero-img")}><img src={data.imgUrl}></img>
                        <div className={cx("img-cover")} style={{ background: data.backgroundCover }} />
                        <div className={cx("description-wrapper")}>
                            <div className={cx("product-desciption")}>
                                <div className={cx('title-description')}>{data.title}</div>
                                <div className={cx('short-description')}>{data.shortDescription}</div>
                            </div>
                            <Button className={cx("information-btn")}>XEM THÔNG TIN</Button>
                        </div>
                    </div>
        ))
    }
    
    return(

        <div className={cx("hero-section")}>
            <div key={Math.random()}  className={cx("hero-background") } style={ // co tinh re render de chay duoc animation
                { 
                background: heroBackgroundBanner
                }}></div>
            <div  className={cx("hero-banner")}>
                
                {/* <div style={{marginRight: "20px"}} className={cx("hero-img")} /> */}
                <Slider changeHeroBackground={changeHeroBackground}  items={generateHeroBanner()} data={heroData}/>
                
                {/* <div style={{marginLeft : "20px"}} className={cx("hero-img")} /> */}
            </div>
        </div>
    )
}

export default HeroSection
