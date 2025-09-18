
import { useContext, useEffect, useState } from "react"
import styles from "./ChapterPage.module.scss"
import classNames from "classnames/bind"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { DefaultLayoutContext } from "../../Component/DefaultLayoutProvider/DefaultLayoutProvider"
import { paths } from "../../routes/PathRoutes"

const cx = classNames.bind(styles)

const backgroudColors = {dafault : "#111827"}

function ChapterPage(){

    const [dataResult, setDataResult]= useState([])
    const {id} = useParams()
    const {setBackgroundColor} = useContext(DefaultLayoutContext)
    

    useEffect(() =>{
        setBackgroundColor(backgroudColors.dafault)
    },[])

    useEffect(() =>{
        const callApi = async () =>{
            const response  = await axios.get(`http://localhost:8080/chapter/getChapter/${id}`)
            console.log(response.request)
            response.data.imageResponses?.sort((a,b) => parseInt(a.img_order) - parseInt(b.img_order))
            setDataResult(response.data)
        }

        callApi()
    },[])
    console.log(dataResult.name)
    return (
        <div className={cx("wrapper")}>
            <div className={cx("wrapper_vertical")}>
                <div className={cx("toolpanel-chapter")}>
                    <Link to={paths.mangas+"/"+dataResult.book_id} className={cx("prev-manga-page")}> {dataResult.name}</Link>
                </div>
                {dataResult?.imageResponses?.map((item) =>{
                   return <picture key={item.img_order} className={cx("chapter_img")}>
                            <img key={item.id} src={item.img_url}></img>
                        </picture>
                })
                }
            </div>
            
        </div>
    )
}

export default ChapterPage