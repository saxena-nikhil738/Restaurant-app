import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./App.css";
import AddNew from "./Components/AddNew/AddNew";
import Header from "./Components/Header/Header";
import Home from "./Components/Home";
import EditRestaurant from "./Components/EditRestaurant/EditRestaurant";
import Collection from "./Components/Collections/Collection";
import { ToastContainer } from "react-toastify";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage-restaurants" element={<Collection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-new-restaurant" element={<AddNew />} />
          <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
