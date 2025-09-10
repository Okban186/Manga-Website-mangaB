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
const cx = classNames.bind(styles)



function SectionRow({header, apiGetData}){

    const [skeleton, setSkeleton] = useState(true)
    const [dataResult, setDataResult] = useState([])
    useEffect(() =>{
        const fetchApi = async () =>{
            setSkeleton(true)
            const response = await axios.get(apiGetData, {
                params:{pageNumber:0,pageSize:24}
            })
            setDataResult(response.data)
            setSkeleton(false)
        }
        fetchApi()
    },[apiGetData])
    const generateCardSection = () =>(
            <div className={cx("container-card")}>
               { dataResult.map((item) => (
                <CardManga key={item.id} title={item.title} 
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
        <div className={cx("wrapper")}>
            <div className={cx("section-row")} >

                <div className={cx("inner")}>
                    <div className={cx("title-section-row")}>{header}</div>
                    <Slider className={cx("slide-hero")} over_flow_hidden arrow={!skeleton}
                    items={skeleton ? generateSkeletonCard() : generateCardSection()} />
                </div>
            </div>
        </div>
    )
}

export default SectionRow