import Button from "../../Button/Button"
import styles from "./MenuDrop.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

function MenuItem({children, classNames, data, onclick}){
    return(
        <Button onClick={onclick} className={cx(classNames, {separate : data.separate})} to={data.to}>{data.title}</Button>
    )
}

export default MenuItem