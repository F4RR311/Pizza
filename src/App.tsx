import React, {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import Home from "./Pages/Home";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./Pages/Cart'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './Pages/FullPizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './Pages/NotFound'))

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="/cart" element={<Suspense fallback={<>идет загрузка корзины...</>}>
                    <Cart/>
                </Suspense>}/>
                <Route path="/pizza/:id" element={<Suspense fallback={<>идет загрузка..</>}>
                    <FullPizza/>
                </Suspense>}/>
                <Route path="*" element={<Suspense fallback={<>идет загрузка..</>}>
                    <NotFound/>
                </Suspense>}/>
            </Route>
        </Routes>
    );
}

export default App;
