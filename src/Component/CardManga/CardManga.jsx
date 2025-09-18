import styles from "./CardManga.module.scss"
import classNames from "classnames/bind"
import { timeAgo } from "./timeago"
import { Link } from "react-router-dom"
import {authorsBuilding} from "../../LogicalFunction/AuthorBuildingString"
import { paths } from "../../routes/PathRoutes"

const cx = classNames.bind(styles)

export default function CardManga({id,slug="",title,coverImg ,newestChapter, updateTime,createAt, horizontal, authors}){

    let CardFrag = Link


   


    return (
        <CardFrag to={paths.mangas+"/"+`${id}-${slug}`} className={cx("card-section",horizontal && ["horizontal-card","smallImg"])}>
            {coverImg && <img loading="lazy" src={coverImg} alt={title}></img>}
            
            {<div className={cx('information-card')}>
                {title && <div className={cx("title-card")}>{title}</div>}
                {authors && <div className={cx("author-card")}>{authorsBuilding(authors)}</div>}
                <div className={cx("inline")}>
                    {newestChapter != undefined && <div className={cx("chapter-card")}>{"C."+newestChapter}</div>}
                    {(updateTime || createAt) && <div className={cx("update-time")}>
                        {updateTime ? timeAgo(updateTime) : timeAgo(createAt)}
                    </div>}
                </div>
            </div>}
        </CardFrag>
    )
}
