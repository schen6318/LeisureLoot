import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import PostForm2 from "./Components/PostForm2";
import OfferHelp from "./Components/OfferHelpPage";
import SubmitForm from "./Components/submitform";
import AddPoints from "./Components/AddPoints";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/offerHelp" element={<OfferHelp />} />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addPoints"
            element={
              <ProtectedRoute>
                <AddPoints />
              </ProtectedRoute>
            }
          />
          <Route path="/manage" element={<PostForm2 />} />
          <Route path="/submitForm" element={<SubmitForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
