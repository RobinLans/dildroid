import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import SearchResults from "./components/SearchResults";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path="/" exact component={SearchResults}></Route>
        <Route path="/login" component={Login}></Route>
      </Router>
    </div>
  );
}

export default App;
