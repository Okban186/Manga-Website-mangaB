import classNames from "classnames/bind";
import styles from "./SectionRow.module.scss"
import Slider from "../../../Component/Slider/Slider"
import pic1 from "/image/image_processing20230620-581-zf5dvv.jpg"
import pic2 from "/image/image_processing20250802-2-1mypltb.jpg"
import pic3 from "/image/image_processing20250820-2-btbv71.jpg"
import SkeletonCardLoading from "../../../Component/SkeletonCardLoading/SkeletonCardLoading";
import { useEffect, useState } from "react";
import axios from "axios";
import { timeAgo } from "../../../Component/CardManga/timeago";
import CardManga from "../../../Component/CardManga/CardManga";
import useInView from "../../../hooks/useInView";
const cx = classNames.bind(styles)



function SectionRow({header, apiGetData, styles, genres, pageNumber,pageSize}){

    const [skeleton, setSkeleton] = useState(true)
    const [dataResult, setDataResult] = useState([])
    const [ref,isInView] = useInView({threshold: 0.1, debouncing: 200})
    useEffect(() =>{
        if(!isInView || dataResult.length > 0) return
        const fetchApi = async () =>{
            setSkeleton(true)
            const response = await apiGetData({genres, pageNumber,pageSize})
            setDataResult(response)
            setSkeleton(false)
        }
        fetchApi()
    },[apiGetData,isInView])
    const generateCardSection = () =>(
            <div className={cx("container-card")}>
               { dataResult.map((item) => (
                <CardManga key={item.id} title={item.title} 
                id={item.id} slug={item.slug}
                coverImg={item.coverImg} 
                newestChapter={item.newestChapter} 
                updateTime={item.updateTime}
                createAt={item.createAt}
                />
                ))    
            }
        </div>
        
    )

    const generateSkeletonCard = () =>{
        const cards = []
        for(let i = 0; i < 24; i++){
            cards.push(
                <SkeletonCardLoading key={i} />
            )
        }
        return <div className={cx("container-card")}>{cards}</div>
    }


    
    return (
        <div className={cx("wrapper")} style={styles}>
            <div className={cx("section-row")} >

                <div className={cx("inner")}>
                    <div className={cx("title-section-row")}>{header}</div>
                    <Slider ref={ref} className={cx("slide-hero")} over_flow_hidden arrow={!skeleton}
                    items={skeleton ? generateSkeletonCard() : generateCardSection()} />
                </div>
            </div>
        </div>
    )
}

export default SectionRow