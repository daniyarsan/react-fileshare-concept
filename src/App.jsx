import {Route, Routes, useNavigate} from "react-router-dom";
import '../html/_assets/css/style.css'
import '../html/_assets/css/structure.css'
import '../html/_assets/fonts/inter/stylesheet.css'
import '../html/_assets/fonts/awesome/css/stylesheet.css'
import "react-toastify/dist/ReactToastify.css";

import Default from "./layout/Default.jsx";
import Auth from "./layout/Auth.jsx";

import RegistrationPage from "./pages/Auth/RegistrationPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import GeneratePage from "./pages/Auth/GeneratePage.jsx";
import AlbumsListPage from "./pages/Albums/AlbumsListPage.jsx";
import AlbumDetailsPage from "./pages/Albums/AlbumDetailsPage.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import StaffPage from "./pages/Dashboard/StaffPage.jsx";
import ForgotPage from "./pages/Auth/ForgotPage.jsx";
import PricingPage from "./pages/Plans/PricingPage.jsx";
import {AUTH_TOKEN} from "./api/const.js";
import {useSelector} from "react-redux";
import ResetPage from "./pages/Auth/ResetPage.jsx";
import {useEffect} from "react";
import AlbumEditPage from "./pages/Albums/AlbumEditPage.jsx";
import AlbumCreatePage from "./pages/Albums/AlbumCreatePage.jsx";

function App() {
  const navigate = useNavigate()
  const {isAuth} = useSelector(state => state.user)
  const isAuthorized = isAuth && localStorage.getItem(AUTH_TOKEN)

  const LogoutComponent = () => {
    useEffect(() => {
      navigate('/')
    }, [])
  }
  
  const getRoutes = (isAuth) => {
    if (!isAuth) {
      return (
          <>
            <Route element={<Auth/>}>
              <Route path="/" element={<LoginPage/>}></Route>
              <Route path="/login" element={<LoginPage/>}></Route>
              <Route path="/registration" element={<RegistrationPage/>}></Route>
              <Route path="/forgot" element={<ForgotPage/>}></Route>
              <Route path="*" element={<LogoutComponent/>}></Route>
            </Route>
          </>
      )
    }

    return (
        <>
          <Route element={<Default/>}>
            <Route path="/" element={<DashboardPage/>}></Route>
            <Route path="/albums" element={<AlbumsListPage/>}></Route>
            <Route path="/album/:url" element={<AlbumDetailsPage/>}></Route>
            <Route path="/album/create" element={<AlbumCreatePage/>}></Route>
            <Route path="/album/edit/:url" element={<AlbumEditPage/>}></Route>
            <Route path="/staff" element={<StaffPage/>}></Route>
            <Route path="/plans" element={<PricingPage/>}></Route>
            <Route path="/reset" element={<ResetPage/>}></Route>
            <Route path="/generate" element={<GeneratePage/>}></Route>
          </Route>
        </>
    )
  }

  return (
      <Routes>
        {getRoutes(isAuthorized)}
      </Routes>
  )

}

export default App
