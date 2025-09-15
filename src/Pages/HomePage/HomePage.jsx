import classNames from "classnames/bind";
import css from "./HomePage.module.scss"
import { Link, Outlet } from "react-router-dom";

    
import HeroSection from "./HeroSection/HeroSection";
import Banner from "../../Component/Banner/Banner";
import SectionRow from "./SectionRow/SectionRow";
import {  useEffect, useState } from "react";
import { getHomePageSetting, getLastestManga, getMangasByTags } from "../../Service/api";
import Button from "../../Component/Button/Button";

const cx = classNames.bind(css);
const public_api = {
    "lastest-mangas":getLastestManga,
    "mangas-by-tags":getMangasByTags 
}

function HomePage(){
    const [homePageSettings, setHomePageSettings] = useState([])

    useEffect(() =>{
        const callApi = async () =>{
            
            const result = await getHomePageSetting()
            setHomePageSettings(result)
        }
        callApi()
    },[])

    

    const renderingMangasByTypes = () =>{
        return homePageSettings?.home_page_blocks?.map((index) =>{
            return <SectionRow key={index.order} styles={{"background" : index.options.bgColor}} header={index.title} genres={index.query} apiGetData={public_api[index.type]} />
        })
    }
    return (
        <div className={cx("wrapper")}>
            <HeroSection />
            {renderingMangasByTypes()}
        </div>
    )
}

export default HomePage;