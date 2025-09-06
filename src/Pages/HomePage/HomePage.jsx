import classNames from "classnames/bind";
import css from "./HomePage.module.scss"
import { Link, Outlet } from "react-router-dom";

    
import HeroSection from "./HeroSection/HeroSection";
import Banner from "../../Component/Banner/Banner";

const cx = classNames.bind(css);

function HomePage(){
    return (
        <div className={cx("wrapper")}>
            <HeroSection />
            {/* <Banner /> */}
        </div>
    )
}

export default HomePage;