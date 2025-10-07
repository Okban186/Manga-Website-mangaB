import classNames from "classnames/bind";
import styles from "./CategoryPage.module.scss"
import { useCallback, useEffect, useState } from "react";
import { getMangasByTags } from "../../Service/api";
import CardManga from "../../Component/CardManga/CardManga";
import { useParams, useSearchParams } from "react-router-dom";
import Button from "../../Component/Button/Button";
import CategoryInner from "./CategoryInner/CategoryInner";

const cx = classNames.bind(styles)

function CategoryPage() {

  const [dataResult, setDataResult] = useState([])
  const { tag } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchParamHandle = useCallback((fnOrObj) => {
    setSearchParams((prev) => {
      const prevObj = Object.fromEntries(prev)
      const newParam = typeof fnOrObj == "function" ? fnOrObj(prevObj) : fnOrObj
      return new URLSearchParams(newParam)
    })
  }, [])

  useEffect(() => {
    const callApi = async () => {
      const response = await getMangasByTags({
        genres: tag, pageNumber: searchParams.get("pageNumber") || 1, pageSize: 14
      })
      setDataResult(response)
    }

    callApi()
  }, [tag, searchParams.get("pageNumber")])

  return (
    <CategoryInner headerKeyWord={tag} dataResult={dataResult} setSearchParams={setSearchParamHandle} />
  )
}

export default CategoryPage;
