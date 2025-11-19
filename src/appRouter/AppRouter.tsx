import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ApartmentDet from '../pages/ApartmentDet'

const AppRouter = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/apartment/:id" element={<ApartmentDet/>}></Route>
    </Routes>
    </>
  )
}

export default AppRouter