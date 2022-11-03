import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import NavBar from "./components/NavBar";

function App() {
  const user = useSelector(state => state.session.user)
  const demo = user ? (<img src={user.photoUrl}/>) : null
  return (
    <>
      <NavBar/>
      {demo}
      <Route path="/login" component={LoginFormPage} />
      <Route path="/signup" component={SignupFormPage} />
    </>

  );
}

export default App;
