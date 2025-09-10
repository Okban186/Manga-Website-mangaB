import styles from "./CardManga.module.scss"
import classNames from "classnames/bind"
import { timeAgo } from "./timeago"

const cx = classNames.bind(styles)

export default function CardManga({title,coverImg ,newestChapter, updateTime,createAt, horizontal, authors}){


    function authorsBuilding(authors){
        if(authors == null || authors == undefined) return ""
        let authorName = []
        authorName.push(authors[0].name)
        for(let i = 1; i < authors.length; i++){
            authorName.push(", ")
            authorName.push(authors[i].name)
        }

        return authorName.join("")
    }


    return (
        <div className={cx("card-section",horizontal && ["horizontal-card","smallImg"])}>
            {coverImg && <img src={coverImg} alt={title}></img>}
            
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
        </div>
    )
}
