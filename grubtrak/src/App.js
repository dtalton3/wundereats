import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route} from 'react-router-dom';
import Signup from "./Signup";
import Login from "./Login"; 
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Settings from "./Settings";
import Impact from "./Impact";
import Messages from "./Messages";
import Connections from "./Connections";
import FAQ from "./FAQ";

function App() {
    return(
        <div>
            <Route exact path="/" component={Signup}/>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/Home" component={Home}/>
            <Route exact path="/About" component={About}/>
            <Route exact path="/Contact" component={Contact}/>
            <Route exact path="/Profile-Settings" component={Settings}/>
            <Route exact path="/Impact-Reports" component={Impact}/>
            <Route exact path="/Messages" component={Messages}/>
            <Route exact path="/Connections" component={Connections}/>
            <Route exact path="/FAQ" component={FAQ}/>
        </div>
    )
}

export default App;