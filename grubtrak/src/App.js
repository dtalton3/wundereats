//import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import Home from './Home.js';
import MyHatcheries from './MyHatcheries.js';
import {Route, Link} from 'react-router-dom';


function App() {
  //if user is not logged in render login page first
  return (
    <div className="App-header">
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/hatcheries" component={MyHatcheries} />
    </div>
  );

  //otherwise if user has login information saved, render home page first
  //developing...
}

export default App;
