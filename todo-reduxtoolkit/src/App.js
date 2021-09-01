import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Register from './components/Register';

import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import { TodoPage } from './components/TodoPage';

const App = () => {
	console.log("Hi!");
	return (
		<div className='container bg-white p-4 mt-5'>
			<Router>
				<Switch>
				<Route exact path="/"><Login /></Route>
				<Route exact path="/register" component ={Register}/>
				<Route exact path="/todopage" component ={TodoPage}/>
			</Switch>
			</Router>
			
			

			
		</div>
	);
};

export default App;
