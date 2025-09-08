import classNames from "classnames/bind";
import css from "./HomePage.module.scss"
import { Link, Outlet } from "react-router-dom";

    
import HeroSection from "./HeroSection/HeroSection";
import Banner from "../../Component/Banner/Banner";
import SectionRow from "./SectionRow/SectionRow";

const cx = classNames.bind(css);

function HomePage(){
    return (
        <div className={cx("wrapper")}>
            <HeroSection />
            <SectionRow header={"TOP TRENDING"} apiGetData={"http://localhost:8080/book/getRecentlyUpdateBook"} />
        </div>
    )
}

export default HomePage;