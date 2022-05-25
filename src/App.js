import React from 'react'
import './App.scss'
import {Header} from './Components';
import {Home, Cart} from "./Pages";
import {Routes, Route} from "react-router-dom";

function App() {


    return (


        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route exact path="/" element={
                        <>
                            <Home route="/"/>
                        </>
                    }/>
                    <Route exact path="/cart" element={
                        <>
                            <Cart route="/cart"/>
                        </>
                    }/>
                </Routes>
            </div>
        </div>

    )


}


export default App;
