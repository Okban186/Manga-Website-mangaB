import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './Pages/AuthPage/AuthPage'
import HomePage from './Pages/HomePage/HomePage'
import { public_endpoints } from './routes/routes'
import { Fragment } from 'react'
import DefaultLayout from './layout/DefaultLayout'
function App() {
  return (
      <Routes>
        {public_endpoints.map((route, index) =>{
            let Layout = DefaultLayout
            if(route.layout)
              Layout = route.layout
            else if(route.layout === null)
              Layout = Fragment
            const Page = route.component
            return <Route path={route.path} key={index} element={
              <Layout>
                  <Page />
              </Layout>
            } />
        })}
      </Routes>
  )
}

export default App
