import classNames from "classnames/bind";
import styles from "./SearchPage.module.scss"
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DefaultLayoutContext } from "../../Component/DefaultLayoutProvider/DefaultLayoutProvider";
import Button from "../../Component/Button/Button";
import { getMangasByTags, searchBook, searchBookUseKeyWordAndGenre } from "../../Service/api";
import CategoryInner from "../Category/CategoryInner/CategoryInner";
import { useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles)

function SearchPage() {

  const bookTitleInput = useRef(null);
  const genreInput = useRef(null);
  const [getValue, setValue] = useState({})
  const [searchParam, setSearchParam] = useSearchParams()

  useEffect(() => {

    const q = searchParam.get("q")?.trim()
    const genres = searchParam.get("genres")?.trim()
    const page = parseInt(searchParam.get("pageNumber")) || 1
    if (!q && !genres) return;
    bookTitleInput.current.value = q || ""
    genreInput.current.value = genres || ""
    searchBookfunc({ pageNumber: page })
  }, [searchParam])

  const setSearchParamHandle = (fnOrObject) => {
    setSearchParam((prev) => {
      const prevObj = Object.fromEntries(prev);
      const newParams =
        typeof fnOrObject === "function" ? fnOrObject(prevObj) : fnOrObject;
      return new URLSearchParams(newParams); // ✅
    });
  }
  const searchBookfunc = useCallback(async ({ pageNumber = 1 }) => {
    const q = bookTitleInput.current.value.trim()
    const genres = genreInput.current.value.trim()
    if (!q && !genres) return;
    if (!q && genres) {
      const response = await getMangasByTags({
        genres, pageNumber, pageSize: 14
      });
      setSearchParam({ genres, pageNumber })
      setValue(response)

    } else if (q && !genres) {
      const response = await searchBook({
        q, pageNumber, pageSize: 14
      })
      setSearchParam({ q, pageNumber })
      setValue(response)
    } else {
      const response = await searchBookUseKeyWordAndGenre({ q, genres, pageNumber, pageSize: 14 })
      setSearchParam({
        q, genres, pageNumber
      })
      setValue(response)
    }
  }, [])

  const { setBackgroundColor } = useContext(DefaultLayoutContext);
  useEffect(() => {
    setBackgroundColor("#d1d5db")
  }, [])
  return (
    <main className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("search-panel")}>
          <input ref={bookTitleInput} placeholder="Tim kiem ten truyen" />
          <input ref={genreInput} placeholder="Nhap the loai cach nhau bang dau ," />
          <Button onClick={searchBookfunc} className={cx("search-btn")}>Tim kiem</Button>
          <div className={cx("container-body")}>
            {getValue.bookResponses?.length == 0 || Object.keys(getValue).length == 0 ? <picture className={cx("img404")}>
              <img src="https://okban186.github.io/Image/ResultNotFound/resultNotFound.png" />
            </picture> :
              <CategoryInner headerKeyWord={bookTitleInput.current.value + " tag " + genreInput.current.value} dataResult={getValue} setSearchParams={setSearchParamHandle} />}
          </div>
        </div>
      </div>
    </main>
  )
}

export default SearchPage;
