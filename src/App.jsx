import {AUTH_TOKEN} from "./api/const.js";
import {useSelector} from "react-redux";

import {Route, Routes} from "react-router-dom";
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
import PricingPage from "./pages/Plans/PricingPage.jsx"
import ResetPage from "./pages/Auth/ResetPage.jsx";
import AlbumEditPage from "./pages/Albums/AlbumEditPage.jsx";
import AlbumCreatePage from "./pages/Albums/AlbumCreatePage.jsx";
import AlbumDetailsPublicPage from "./pages/Albums/AlbumDetailsPublicPage.jsx";
import NotFound from "./pages/Stuff/NotFound.jsx";

function App() {
  const {isAuth} = useSelector(state => state.user)
  const isAuthorized = isAuth && localStorage.getItem(AUTH_TOKEN)
  
  const getRoutes = (isAuth) => {
    if (!isAuth) {
      return (
          <>
            <Route element={<Default/>}>
              <Route path="/" element={<AlbumCreatePage/>}></Route>
              <Route path="/plans" element={<PricingPage/>}></Route>
              <Route path="/album/:url/:password" element={<AlbumDetailsPublicPage/>}></Route>
              <Route path='*' element={<NotFound />}/>
            </Route>

            <Route element={<Auth/>}>
              <Route path="/login" element={<LoginPage/>}></Route>
              <Route path="/registration" element={<RegistrationPage/>}></Route>
              <Route path="/forgot" element={<ForgotPage/>}></Route>
            </Route>
          </>
      )
    }

    return (
        <>
          <Route element={<Default/>}>
            <Route path="/" element={<DashboardPage/>}></Route>
            <Route path="/albums" element={<AlbumsListPage/>}></Route>
            <Route path="/album/create" element={<AlbumCreatePage/>}></Route>
            <Route path="/album/edit/:url" element={<AlbumEditPage/>}></Route>
            <Route path="/album/:url" element={<AlbumDetailsPage/>}></Route>
            <Route path="/staff" element={<StaffPage/>}></Route>
            <Route path="/reset" element={<ResetPage/>}></Route>
            <Route path="/generate" element={<GeneratePage/>}></Route>
            <Route path="/plans" element={<PricingPage/>}></Route>
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
