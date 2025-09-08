import styles from "./CardManga.module.scss"
import classNames from "classnames/bind"
import { timeAgo } from "./timeago"

const cx = classNames.bind(styles)

export default function CardManga({title,coverImg ,newestChapter, updateTime,createAt}){
    return (
        <div className={cx("card-section")}>
            <img src={coverImg} alt={title}></img>
            <div className={cx("title-card")}>{title}</div>
            <div className={cx('information-card')}>
                <div className={cx("chapter-card")}>{"C."+newestChapter}</div>-
                <div className={cx("update-time")}>
                    {updateTime ? timeAgo(updateTime) : timeAgo(createAt)}
                </div>
            </div>
        </div>
    )
}