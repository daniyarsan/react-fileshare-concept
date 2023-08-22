import React from 'react'
import {useSelector} from "react-redux";
import {Dashboard} from "../../components/Dashboard/Dashboard.jsx";

function DashboardPage() {
  const {userData} = useSelector(state => state.user)

  return (
      <section className='canvas'>
        <Dashboard {...{userData}} />
      </section>
  )
}

export default DashboardPage
