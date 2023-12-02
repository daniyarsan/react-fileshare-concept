import {Route, Routes, Navigate} from "react-router-dom";

import React, {useContext} from "react";

import Default from "./layout/Default.jsx";
import RegistrationPage from "./pages/Auth/RegistrationPage.jsx";
import {LoginPage} from "./pages/Auth/LoginPage.jsx";
import GeneratePage from "./pages/Auth/GeneratePage.jsx";
import AlbumsListPage from "./pages/Albums/AlbumsListPage.jsx";
import AlbumDetailsPage from "./pages/Albums/AlbumDetailsPage.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import ForgotPage from "./pages/Auth/ForgotPage.jsx";
import PricingPage from "./pages/Pricing/PricingPage.jsx"
import ResetPage from "./pages/Auth/ResetPage.jsx";
import AlbumEditPage from "./pages/Albums/AlbumEditPage.jsx";
import AlbumCreatePage from "./pages/Albums/AlbumCreatePage.jsx";
import AlbumShowPage from "./pages/Albums/AlbumShowPage.jsx";
import {AuthContext} from "./contexts/AuthProvider.jsx";
import PolicyPage from "./pages/Auth/PolicyPage.jsx";
import TermsPage from "./pages/Auth/TermsPage.jsx";



function Routing() {
  const { currentUser } = useContext(AuthContext);
  // const { setLoader } = useContext(AuthContext);
  // useEffect(() => {
  //   setLoader(true)
  //   const onPageLoad = () => {
  //     setLoader(false)
  //   }
  //   if (document.readyState === 'complete') {
  //     onPageLoad();
  //   } else {
  //     window.addEventListener('load', onPageLoad, false);
  //     return () => window.removeEventListener('load', onPageLoad);
  //   }
  // }, [])

  if (!currentUser.isAuthorized) {
    return (
        <Routes>
          <Route element={<Default className="row row_col row_sb" />}>
            <Route path="/" element={<AlbumCreatePage/>}></Route>
            <Route path="/show/:url" element={<AlbumShowPage/>}></Route>
            <Route path="/show/:url/:password" element={<AlbumShowPage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/registration" element={<RegistrationPage/>}></Route>
            <Route path="/policy" element={<PolicyPage/>}></Route>
            <Route path="/terms" element={<TermsPage/>}></Route>
            <Route path="/forgot" element={<ForgotPage/>}></Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
          <Route element={<Default className="row row_col row_sb" />}>
            <Route path="/plans" element={<PricingPage/>}></Route>
          </Route>
        </Routes>
    )
  }

    return (
        <Routes>
          <Route element={<Default className="row row_col row_sb" />}>
            <Route path="/" element={<AlbumCreatePage/>}></Route>
            <Route path="/profile" element={<DashboardPage/>}></Route>
            <Route path="/albums" element={<AlbumsListPage/>}></Route>
            <Route path="/album/edit/:url" element={<AlbumEditPage/>}></Route>
            <Route path="/album/:url" element={<AlbumDetailsPage/>}></Route>
            <Route path="/show/:url/:password" element={<AlbumShowPage/>}></Route>
            <Route path="/show/:url" element={<AlbumShowPage/>}></Route>
            <Route path="/reset" element={<ResetPage/>}></Route>
            <Route path="/generate" element={<GeneratePage/>}></Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>

          <Route element={<Default className="row row_col row_sb" />}>
            <Route path="/plans" element={<PricingPage/>}></Route>
          </Route>
        </Routes>
    )

}

export default Routing
