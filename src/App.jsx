import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { public_endpoints } from './routes/routes'
import { Fragment, useContext, useEffect } from 'react'
import DefaultLayout from './layout/DefaultLayout'
import { AuthContext } from './Component/AuthProvider/AuthProvider'
import { getInfo } from './Service/api'
import { Suspense } from 'react'
function App() {

  const {isLogin,setLogin} = useContext(AuthContext)
  useEffect(() =>{
    const checkLogin = async () =>{
      const response = await getInfo()
      if(response){
        localStorage.setItem("User Detail",JSON.stringify(response))
        setLogin(true)
      }else setLogin(false)
    }
    checkLogin()
  },[isLogin])



  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {public_endpoints.map((route, index) => {
          let Layout = DefaultLayout
          if (route.layout)
            Layout = route.layout
          else if (route.layout === null)
            Layout = Fragment
  
          const Page = route.component
          return (
            <Route
              path={route.path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        })}
      </Routes>
    </Suspense>
  )
}
  

export default App
