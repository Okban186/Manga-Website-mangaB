
import { useContext, useEffect, useState } from "react"
import styles from "./ChapterPage.module.scss"
import classNames from "classnames/bind"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { DefaultLayoutContext } from "../../Component/DefaultLayoutProvider/DefaultLayoutProvider"
import { paths } from "../../routes/PathRoutes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Button from "../../Component/Button/Button"

const cx = classNames.bind(styles)

const backgroudColors = { dafault: "#111827" }

function ChapterPage() {

  const [dataResult, setDataResult] = useState([])
  const { id } = useParams()
  const { setBackgroundColor } = useContext(DefaultLayoutContext)


  useEffect(() => {
    setBackgroundColor(backgroudColors.dafault)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const callApi = async () => {
      const response = await axios.get(`http://localhost:8080/chapter/getChapter/${id}`)
      response.data.imageResponses?.sort((a, b) => parseInt(a.img_order) - parseInt(b.img_order))
      setDataResult(response.data)
    }

    callApi()
  }, [id])

  const createChapterTitle = () => {
    const s = `Chapter ${dataResult.chapter_order}${dataResult.title ? ": " + dataResult.title : ""}`;
    return s
  }

  return (
    <div className={cx("wrapper")}>
      <main className={cx("chapter-page-inner")}>
        <div className={cx("toolpanel-chapter")}>
          <Link to={paths.mangas + "/" + dataResult.book_id} className={cx("prev-manga-page")}><FontAwesomeIcon icon={faArrowLeft} /> {dataResult.name}</Link>
          <h1>{createChapterTitle()}</h1>
          <div className={cx("function-btn")}>
            <Button to={paths.mangas + "/" + dataResult.book_id + paths.chapters + "/" + dataResult.next_chapter_id} className={cx("next-chapter", dataResult.next_chapter_id == null ? "not-response-color" : "")}>NEXT CHAPTER</Button>
            <Button to={paths.mangas + "/" + dataResult.book_id + paths.chapters + "/" + dataResult.prev_chapter_id} className={cx("pre-chapter", dataResult.prev_chapter_id == null ? "not-response-color" : "")}>PREVIOUS CHAPTER</Button>
          </div>
        </div>
        <div className={cx("wrapper_vertical")}>

          {dataResult?.imageResponses?.map((item) => {
            return <picture key={item.img_order} className={cx("chapter_img")}>
              <img key={item.id} src={item.img_url}></img>
            </picture>
          })
          }
        </div>
        <div className={cx("next-chapter-btn")}>
          <Button to={paths.mangas + "/" + dataResult.book_id + paths.chapters + "/" + dataResult.next_chapter_id} className={cx("inner", dataResult.next_chapter_id == null ? "not-response-color" : "")}>
            <div>{dataResult.next_chapter_order == -1 ? "THIS IS LATEST CHAPTER" : `READ CHAPTER ${dataResult.next_chapter_order}`}</div>
            {dataResult.title_next_chapter && <div>{dataResult.title_next_chapter.toUpperCase()}</div>}
          </Button>
        </div>
        <div style={{ maxWidth: "624px", display: "flex", flexDirection: "row", margin: "8px auto 0 auto" }}>
          {dataResult.prev_chapter_id == null ? <Button className={cx("func-button-bottom", "not-response-color")}><div>OLDEST CHAPTER</div></Button> :
            <Button to={paths.mangas + "/" + dataResult.book_id + paths.chapters + "/" + dataResult.prev_chapter_id} className={cx("func-button-bottom")}>{`PREVIOUS CHAPTER - ${dataResult.prev_chapter_order}`}</Button>}
          <Button className={cx("func-button-bottom")} onClick={() => window.scrollTo(0, 0)} ><div>TO TOP</div></Button>
        </div>
      </main >
    </div >
  )
}

export default ChapterPage
