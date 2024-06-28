import {Routes,Route} from "react-router-dom";
import { FarmDetails,MilkDetails,Payments,ProductsDispatched } from "../pages";
import {Home} from "../components";
import React from 'react'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="/farm/farmdetails" element={<FarmDetails/> }/>
      <Route path="/farm/milkdetails" element={<MilkDetails/>}/>
      <Route path="/farm/payments" element={<Payments/>}/>
      <Route path="/farm/productsdispatched" element={<ProductsDispatched/>}/>
    </Routes>
  )
}

export default AllRoutes


