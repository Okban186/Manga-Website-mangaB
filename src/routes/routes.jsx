import { lazy } from "react";
const AuthPage = lazy(() => import("../Pages/AuthPage/AuthPage")) ; 
const HomePage = lazy( () => import("../Pages/HomePage/HomePage")); 
const MangasPage = lazy(() => import("../Pages/MangasPage/MangasPage"));
import { paths } from "./PathRoutes";

const public_endpoints= [
    {path: paths.home, component : HomePage},
    {path: paths.login, component : AuthPage},
    {path: paths.mangas, component: MangasPage}
]

const private_endpoints= [
    
]

export {private_endpoints, public_endpoints}