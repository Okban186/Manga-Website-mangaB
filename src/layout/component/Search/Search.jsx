import classNames from "classnames/bind";
import styles from "./Search.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "../../../Component/Button/Button";

const cx = classNames.bind(styles)

function Search(){

    const [searchValue, setSearchValue] = useState('')
    const [hideSearch, setHideSearch] = useState(null)

    const handlingShowSearch = () =>{
        setHideSearch(false)
    }

    const handlingHideSearch = () =>{
        setHideSearch(true)
    }

    const handlingSearch = () =>{
        console.log("Searching...")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          console.log("Enter pressed!");
          // chạy function bạn muốn ở đây
        }
      };

    const handlingInputValue = (value) =>{
        if(value.startsWith(" ")) return;
        setSearchValue(value)
    }

    const searchClass = {
        disable : hideSearch === null ? true : false,
        'slide-out' : hideSearch
    }

    return(
        <div className={cx("wrapper")}>
            <div className={cx("search", {...searchClass})}>
                <div className={cx("exist")} onClick={handlingHideSearch}><FontAwesomeIcon icon={faArrowLeft}/></div>
                <input onKeyDown={(e) => handleKeyDown(e)}  placeholder="Search..." type="text" value={searchValue} onChange={(e) => handlingInputValue(e.target.value)}/>
            </div>
            <Button circle className={cx("search-btn")} onClick={hideSearch === null || hideSearch ? handlingShowSearch : handlingSearch}><FontAwesomeIcon icon={faSearch}/></Button>
        </div>

    )
}

export default Search;