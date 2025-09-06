
import css from "./Wrapper.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(css)

function Wrapper({children, classname}){
    return (
        <div className={cx("wrapper", classname)}>{children}</div>
    )
}

export default Wrapper