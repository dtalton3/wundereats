import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route} from 'react-router-dom';
import Signup from "./Signup";
import Login from "./Login"; 
import Home from "./Home";
import CreateHatchery from "./CreateHatchery"
import About from "./About";
import Contact from "./Contact";
import Profile from "./Profile";

function App() {
    return(
        <div>
            <Route exact path="/" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/createhatchery" component={CreateHatchery}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/profile" component={Profile}/>

        </div>
    )
}

export default App;