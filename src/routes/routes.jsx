import DefaultLayout from "../layout/DefaultLayout";
import AuthPage from "../Pages/AuthPage/AuthPage";
import HomePage from "../Pages/HomePage/HomePage";
import { paths } from "./PathRoutes";

const public_endpoints= [
    {path: paths.home, component : HomePage},
    {path: paths.login, component : AuthPage}
]

const private_endpoints= [
    
]

export {private_endpoints, public_endpoints}