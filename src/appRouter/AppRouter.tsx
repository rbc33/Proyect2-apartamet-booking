import { Route, Routes } from 'react-router-dom'
import Home from '../pages/MakeBooking'
import ApartmentDet from '../pages/ApartmentDet'
import EditApartment from '../pages/EditApartment'

const AppRouter = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/apartment/:id" element={<ApartmentDet/>}></Route>
        <Route path="/apartment/:id/edit" element={<EditApartment/>}></Route>
    </Routes>
    </>
  )
}

export default AppRouter