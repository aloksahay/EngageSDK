import React from 'react'
import {Route, Routes } from "react-router-dom"

import Home from '../pages/home'
const customRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}> </Route>
        </Routes>
    )

}

export default customRoutes