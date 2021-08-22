import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AddTodoForm from './components/AddTodoForm';
// import TodoList from './components/TodoList';
// import TotalCompleteItems from './components/TotalCompleteItems';
import Login from './components/Login';
import Register from './components/Register';

import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

const App = () => {
	console.log("Hi!");
	return (
		<div className='container bg-white p-4 mt-5'>
			<Router>
				<Switch>
				<Route exact path="/"><Login /></Route>
				<Route exact path="/register" component ={Register}></Route>
			</Switch>
			</Router>
			
			
{/* 
			<h1>My Todo List</h1>
			<AddTodoForm />
			<TodoList />
			<TotalCompleteItems /> */}
		</div>
	);
};

export default App;
