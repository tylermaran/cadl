// Importing Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importing Components
import Landing from './pages/Landing';
import Upload from './pages/Upload';
import View from './pages/View';
import Testing from './pages/Testing';
import NoMatch from './pages/NoMatch';
import Browse from './pages/Browse';
import Categories from './pages/Categories';
import Project from './pages/Project';
import Learn from './pages/Learn';
// import SignUp from './pages/SignUp';

// Importing Styling
import './App.css';
import Create from './pages/Create';

function App() {

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/create" component={Create} />
					<Route exact path="/upload" component={Upload} />
					<Route exact path="/view" component={View} />
					<Route exact path="/testing" component={Testing} />
					<Route exact path="/learn-cad" component={Learn} />
					{/* <Route exact path="/signup" component={SignUp}/> */}
					<Route path="/projects/:category" component={Browse} />
					<Route path="/:category/:project" component={Project} />
					<Route exact path="/categories" component={Categories} />
					<Route component={NoMatch} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
