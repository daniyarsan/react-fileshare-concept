import {Route, Routes, useNavigate} from "react-router-dom";
import '../html/_assets/css/style.css'
import '../html/_assets/css/structure.css'
import '../html/_assets/fonts/inter/stylesheet.css'
import '../html/_assets/fonts/awesome/css/stylesheet.css'
import "react-toastify/dist/ReactToastify.css";

import Default from "./layout/Default.jsx";
import Auth from "./layout/Auth.jsx";

import Registration from "./pages/Auth/Registration.jsx";
import Login from "./pages/Auth/Login.jsx";
import Generation from "./pages/Auth/Generation.jsx";
import Albums from "./pages/Albums/Albums.jsx";
import Album from "./pages/Albums/Album.jsx";
import CreateAlbum from "./pages/Albums/CreateAlbum.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Staff from "./pages/Dashboard/Staff.jsx";
import Forgot from "./pages/Auth/Forgot.jsx";
import Plans from "./pages/Plans/Plans.jsx";
import Public from "./layout/Public.jsx";
import {AUTH_TOKEN} from "./api/const.js";
import {useSelector} from "react-redux";

function App() {
  const {isAuth} = useSelector(state => state.user)
  const isAuthorized = isAuth || localStorage.getItem(AUTH_TOKEN)

  const getRoutes = (isAuth) => {
    if (!isAuth) {
      return (
          <>
            <Route element={<Auth/>}>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/forgot" element={<Forgot/>}></Route>
              <Route path="/registration" element={<Registration/>}></Route>
              <Route path="/generation" element={<Generation/>}></Route>
            </Route>
          </>
      )
    }

    return (
        <>
          <Route element={<Public/>}>
            <Route path="/plans" element={<Plans/>}></Route>
          </Route>

          <Route element={<Default/>}>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/albums" element={<Albums/>}></Route>
            <Route path="/album/:id" element={<Album/>}></Route>
            <Route path="/album/create" element={<CreateAlbum/>}></Route>
            <Route path="/staff" element={<Staff/>}></Route>
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
