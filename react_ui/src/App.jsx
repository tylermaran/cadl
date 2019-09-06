// Importing Dependencies 
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importing Components
import Landing from './pages/Landing';
import Upload from './pages/Upload';
import Testing from './pages/Testing';
import NoMatch from './pages/NoMatch';


// Importing Styling
import './App.css';
import Create from './pages/Create';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path='/' component = { Landing } />
					<Route exact path='/create' component = { Create } />
					<Route exact path='/upload' component = { Upload } />
					<Route exact path='/testing' component = { Testing } />
					<Route component = {NoMatch} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;