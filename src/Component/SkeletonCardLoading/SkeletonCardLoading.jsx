import styles from "./SkeletonCardLoading.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function SkeletonCardLoading() {
  return (
    <div className={cx("card")}>
      <div className={cx("skeleton", "image")} />
      <div className={cx("skeleton", "title")} />
      <div className={cx("skeleton", "subtitle")} />
    </div>
  );
}