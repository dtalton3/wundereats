import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import Signup from "./Signup";
import Login from "./Login"; 
import Home from "./Home";
import CreateHatchery from "./CreateHatchery"


function App() {
    return(
        <div>
            <Route exact path="/" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/createhatchery" component={CreateHatchery}/>
        </div>
    )
}

export default App;