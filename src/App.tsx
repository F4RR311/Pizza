import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import FullPizza from "./Pages/FullPizza";
import NotFound from "./Pages/NotFound";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/pizza/:id" element={<FullPizza />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
