import { lazy } from "react";
const AuthPage = lazy(() => import("../Pages/AuthPage/AuthPage")) ; 
const HomePage = lazy( () => import("../Pages/HomePage/HomePage")); 
const MangasPage = lazy(() => import("../Pages/MangasPage/MangasPage"));
import { paths } from "./PathRoutes";
import ChapterPage from "../Pages/ChapterPage/ChapterPage";

const public_endpoints= [
    {path: paths.home, component : HomePage},
    {path: paths.login, component : AuthPage},
    {path: paths.mangas+"/:param", component: MangasPage},
    {path: paths.chapters+"/:id", component: ChapterPage, position_non_fix : true}
]

const private_endpoints= [
    
]

export {private_endpoints, public_endpoints}