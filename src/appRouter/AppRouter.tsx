import { Route, Routes } from 'react-router-dom'
import NewBooking from '../pages/NewBooking'
import ApartmentDet from '../pages/ApartmentDet'
import EditApartment from '../pages/EditApartment'
import HomePage from '../pages/HomePage'

const AppRouter = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/newbooking" element={<NewBooking/>}></Route>
        <Route path="/apartment/:id" element={<ApartmentDet/>}></Route>
        <Route path="/apartment/:id/edit" element={<EditApartment/>}></Route>
        <Route path="/*" element={<h1>404 Error page ot found</h1>}></Route>
    </Routes>
    </>
  )
}

export default AppRouter