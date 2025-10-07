import classNames from "classnames/bind";
import styles from "./Search.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../../Component/Button/Button";
import CardManga from "../../../Component/CardManga/CardManga"
import HeadLessTippy from "@tippyjs/react/headless";
import useDebounce from "../../../hooks/useDebounce"
import axios from "axios";
import { Link } from "react-router-dom";
import { paths } from "../../../routes/PathRoutes";
import { searchBook } from "../../../Service/api";

const cx = classNames.bind(styles)

function Search({ classNamesBtn }) {

  const [searchValue, setSearchValue] = useState('')
  const [hideSearch, setHideSearch] = useState(null)
  const [getValue, setGetValue] = useState([])
  const [loading, setLoading] = useState(false)

  const searchDebounce = useDebounce(searchValue, 400)

  useEffect(() => {

    if (!searchDebounce.trim() || searchDebounce.startsWith(' ')) {
      setGetValue([])
      return
    }
    const callApi = async () => {
      setLoading(true)

      const response = await searchBook({ q: searchDebounce, pageSize: 5 })
      setGetValue(response)
      setLoading(false)
    }

    callApi()
  }, [searchDebounce])

  const handlingShowSearch = useCallback(() => {
    setHideSearch(false)
  }, [])

  const handlingHideSearch = useCallback(() => {
    setHideSearch(true)
  }, [])

  const renderingCardResult = useMemo(() => {
    return getValue.bookResponses?.map((item) => (

      <div key={item.id} className={cx("card-result")}>
        <div onClick={handlingHideSearch} className={cx("card-inner")}>
          <CardManga id={item.id} slug={item.slug} title={item.title} horizontal={true} authors={item.authors} coverImg={item.coverImg} />
        </div>
      </div>
    ))
  }, [getValue])



  const handlingInputValue = (value) => {
    if (value.startsWith(" ")) return;
    setSearchValue(value)
  }
  const searchResultDash = useCallback((attrs) => {
    return <div className={cx("search-result")} data-state={hideSearch ? "hidden" : hideSearch == null ? "" : "visible"} tabIndex={-1} {...attrs}>
      <div className={cx("advance-search")}><Link onClick={handlingHideSearch} to={paths.search}>Advance search</Link></div>
      <div className={cx("container-result")}>
        {!loading && renderingCardResult}
        {!loading && getValue.length != 0 && <div className={cx("searh-more")}>{"Tim kiem tat ca ket qua voi tu khoa " + searchValue}</div>}
      </div>
      {loading && <div className={cx("state-result")}>{"Dang tim kiem..."}</div>}
      {getValue.length == 0 && searchDebounce && !loading && <div className={cx("state-result")}>{"Khong tim thay ket qua voi tu khoa "}<div style={{ fontWeight: 600 }} >{searchDebounce}</div></div>}
    </div>

  }, [getValue])

  const searchClass = {
    disable: hideSearch === null ? true : false,
    'slide-out': hideSearch
  }
  return (
    <HeadLessTippy
      interactive={true}
      visible={!hideSearch}
      onClickOutside={() => {
        if (hideSearch == null) return
        setHideSearch(true)
      }}
      placement="bottom-end"
      render={searchResultDash}
    >
      <div className={cx("wrapper")}>
        <div className={cx("search", { ...searchClass })}>
          <div className={cx("exist")} onClick={handlingHideSearch}><FontAwesomeIcon icon={faArrowLeft} /></div>
          <input placeholder="Search..." type="text" value={searchValue} onChange={(e) => handlingInputValue(e.target.value)} />
        </div>
        <Button circle className={cx("search-btn", (hideSearch || hideSearch == null) && classNamesBtn)} onClick={(hideSearch === null || hideSearch) ? handlingShowSearch : handlingHideSearch}><FontAwesomeIcon icon={faSearch} /></Button>
      </div>
    </HeadLessTippy>

  )
}

export default memo(Search);
