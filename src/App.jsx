import {Route, Routes} from "react-router-dom";
import '../html/_assets/css/style.css'
import '../html/_assets/css/structure.css'
import '../html/_assets/fonts/inter/stylesheet.css'
import '../html/_assets/fonts/awesome/css/stylesheet.css'

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

function App() {
  // const state = useSelector(state => state)
  // const authorized = state.isAuth || localStorage.getItem(AUTH_TOKEN)

  const getRoutes = (auth) => {
    if (!auth) {
      return (
          <>
            <Route element={<Default/>}>
              <Route path="/albums" element={<Albums/>}></Route>
              <Route path="/album/:id" element={<Album/>}></Route>
              <Route path="/album/create" element={<CreateAlbum/>}></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
              <Route path="/staff" element={<Staff/>}></Route>
            </Route>

            <Route element={<Auth/>}>
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

        </>
    )
  }

  return (
      <Routes>
        {getRoutes(false)}
      </Routes>
  )

}

export default App
