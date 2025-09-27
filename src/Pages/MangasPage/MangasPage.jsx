import classNames from "classnames/bind"
import styles from "./MangasPage.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen, faClock, faEye } from "@fortawesome/free-solid-svg-icons"
import Button from "../../Component/Button/Button"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { getBookById } from "../../Service/api"
import { authorsBuilding } from "../../LogicalFunction/AuthorBuildingString"
import { timeAgo } from "../../Component/CardManga/timeago"
import { data, Link, useNavigate, useParams } from "react-router-dom"
import { paths } from "../../routes/PathRoutes"
import { DefaultLayoutContext } from "../../Component/DefaultLayoutProvider/DefaultLayoutProvider"

const cx = classNames.bind(styles)

const genres_items = [
  { title: "hành động", amount: 380 },
  { title: "nsfw", amount: 224 },
  { title: "siêu nhiên", amount: 344 },
  { title: "hài hước", amount: 746 },
  { title: "đang tiến hành", amount: 742 },
  { title: "manga", amount: 1515 },
  { title: "supernatural", amount: 306 },
  { title: "shounen", amount: 327 },
  { title: "ecchi", amount: 251 },
  { title: "khỏa thân", amount: 191 }
]

function MangasPage() {

  const { setBackgroundColor } = useContext(DefaultLayoutContext)
  const descriptionInnerRef = useRef(null)
  const [descriptionInnerOF, setDescriptionInnterOF] = useState(false)
  const [extendDiscription, setExtendDiscription] = useState(true)
  const [dataResult, setDataResult] = useState({})
  const { param } = useParams()
  const navigate = useNavigate()

  const id = useMemo(() => {

    return param.split("-")[0]
  }, [param])

  useEffect(() => {
    if (Object.keys(dataResult).length > 0) return;
    document.body.classList.add("no-scroll")

    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [dataResult])

  useEffect(() => {
    setBackgroundColor("#d1d5db")
  }, [])

  useEffect(() => {
    setDataResult({})
    const callApi = async () => {
      const response = await getBookById({ id: id })
      if (response == undefined) {
        console.log("Loi")
        navigate("/")
      } else {
        response.chapters.sort((a, b) => b.chapter_order - a.chapter_order);

        setDataResult(response)

      }


    }
    window.scrollTo(0, 0)
    callApi()
  }, [id])
  useEffect(() => {
    if (!descriptionInnerRef.current) return
    if (descriptionInnerRef.current.scrollHeight > 200) setDescriptionInnterOF(true)
  }, [])

  const toogleExtendDiscription = () => {
    setExtendDiscription((prev) => !prev)
  }

  const renderingGenreItems = () => {
    return dataResult?.genres?.map((item, index) => {
      return (
        <div key={index} className={cx("genre-item")}>
          <div className={cx("genre-title")}>
            {item.name}
          </div>
          <div className={cx("amount-genre")}>
            {item.book_count}
          </div>
        </div>
      )
    })
  }

  const renderingChapterList = () => {
    return dataResult.chapters?.map((item) => {
      return <Link to={paths.chapters + "/" + item.id} key={item.id} className={cx("chapter-item")}>
        <h5>Chapter {item.chapter_order}</h5>
        <div className={cx("chapter-info")}>
          <div className={cx("title", item.title == null ? "noTitle" : "")}>
            {item.title ? item.title : "no title"}
          </div>
          <div className={cx("stas-chapter")}>
            5 ngay truoc - 8.8k luot xem
          </div>
        </div>
      </Link>

    })
  }


  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("inner")}>
          {/* Phan nay se chua bao gom art cover volumn img them phan mau mo phia sau */}
          <div className={cx("profile-manga")}>
            <div className={cx("cover-art")}>
              <canvas style={{ position: "absolute", zIndex: "0", width: "100%", height: "100%", backgroundColor: "rgb(17, 24, 39)" }}></canvas>
              <div className={cx("color-cover")} style={{ background: dataResult.canvasCover + "50%)" }}></div>
              <picture >
                <img src={dataResult.backgroundImg}></img>
              </picture>
            </div>
            <div className={cx("volumn-title")}>
              <div className={cx("title-info")}>
                {Object.keys(dataResult).length > 0 ? <>
                  <h2>{authorsBuilding(dataResult.authors)}</h2>
                  <h1>{dataResult.title}</h1>
                </> :
                  <>
                    <div className={cx("skeleton-author")} />
                    <div className={cx("skeleton-name")} />
                  </>}
              </div>
              <div className={cx("volumn-cover")}>
                <picture>
                  <canvas style={{ backgroundColor: "gray", position: "absolute", width: "100%", height: "100%" }}></canvas>
                  <img src={dataResult.coverImg} />
                </picture>
              </div>
            </div>
          </div>

          {/* Chua cac thong tin nhu the loai, ngay cap nhat moi nhat, nut chuc nang */}
          <div className={cx("meta-info")}>
            <div className={cx("meta-inner")}>
              <div className={cx("meta-inner-inner")}>
                <div>
                  {Object.keys(dataResult).length > 0 ?
                    <>
                      <div className={cx("update-time")}>
                        <FontAwesomeIcon icon={faClock} /> {dataResult.updateTime ? timeAgo(dataResult.updateTime) : timeAgo(dataResult.createAt)}
                      </div>
                      <div className={cx("genres")}>
                        {renderingGenreItems()}
                      </div>
                    </>
                    :
                    <div className={cx("skeleton-meta-tag")} />}
                </div>
                <div className={cx("function-btn")}>
                  {Object.keys(dataResult).length > 0 ?
                    <>
                      <Button className={cx("follow-btn")}>FOLLOW THE MANGA</Button>
                      <Button to={paths.chapters + "/" + dataResult?.chapters?.at(-1)?.id} className={cx("read-first-page-btn")}>READ FROM CHAPTER {dataResult?.chapters?.at(-1)?.chapter_order}</Button>
                    </> :
                    <>
                      <div className={cx("skeleton-button-meta")} />
                      <div className={cx("skeleton-button-meta")} />
                    </>
                  }

                </div>
              </div>
            </div>
          </div>
          {/* phan nay chua thuc nhat la thong tin nguoi dang thu 2 la phan mo ta, chua cac list chapter */}
          <div className={cx("body-part")}>
            <div className={cx("body-part-inner")}>
              <div className={cx("left-side")}>
                <div className={cx("description", { "overflow-hidden": extendDiscription && descriptionInnerOF })}>
                  <div ref={descriptionInnerRef}>
                    <div className={cx("owner")}>
                      <img alt="SUICAO" src="https://storage-ct.lrclib.net/file/cuutruyen/uploads/team/210/avatar/processed-41ce67905bd99bed1253634a05d91fb6.jpg"></img>
                      <div className={cx("information")}>
                        <div className={cx("name-owner")}>SỦI CẢO</div>
                        <h6>4 TRUYỆN</h6>
                      </div>
                    </div>
                    <div className={cx("description-manga")}>
                      <h6>{dataResult.description}</h6>
                    </div>
                  </div>
                  {descriptionInnerOF && <div onClick={toogleExtendDiscription} className={cx("extend-hide-func", extendDiscription ? "extend" : "hide")}>
                    <h6>{extendDiscription ? "see more" : "see less"}</h6>
                  </div>}
                </div>
                <div className={cx("chapter-list")}>
                  <h6>CHAPTER LIST</h6>
                  <div className={cx("chapters-container")}>
                    {renderingChapterList()}
                  </div>
                </div>
              </div>
              <div className={cx("right-side")}>
                <h4>STATISTICS</h4>
                <div className={cx("statistics-table")}>
                  <div className={cx("table")}>
                    <div className={cx("title")}>
                      <FontAwesomeIcon icon={faBookOpen} /> Chapters
                    </div>
                    <h6>96</h6>
                  </div>
                  <div className={cx("table")}>
                    <div className={cx("title")}>
                      <FontAwesomeIcon icon={faEye} /> Views
                    </div>
                    <h6>1.2M</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MangasPage
