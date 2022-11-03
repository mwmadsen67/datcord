import LoginFormPage from "./components/LoginFormPage";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.session.user)
  debugger
  const demo = user ? (<img src={user.photoUrl}/>) : null
  return (
    <>
      <h1>Hello from App</h1>
      {demo}
      <Route path="/login" component={LoginFormPage}/>
    </>

  );
}

export default App;
