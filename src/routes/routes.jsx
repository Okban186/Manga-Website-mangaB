import { lazy } from "react";
const AuthPage = lazy(() => import("../Pages/AuthPage/AuthPage"));
const HomePage = lazy(() => import("../Pages/HomePage/HomePage"));
const MangasPage = lazy(() => import("../Pages/MangasPage/MangasPage"));
import { paths } from "./PathRoutes";
import ChapterPage from "../Pages/ChapterPage/ChapterPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
const CategoryPage = lazy(() => import("../Pages/Category/CategoryPage"));

const public_endpoints = [
  { path: paths.home, component: HomePage, sentainal: true, transparent_header: true },
  { path: paths.login, component: AuthPage },
  { path: paths.mangas + "/:param", component: MangasPage },
  { path: paths.mangas + "/:book_id" + paths.chapters + "/:id", component: ChapterPage, position_non_fix: true, transparent_header: true },
  { path: paths.category + "/:tag", component: CategoryPage },
  { path: paths.search, component: SearchPage }
]

const private_endpoints = [

]

export { private_endpoints, public_endpoints }
