import { NavLink, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginFormPage from "./components/session/LoginFormPage";
import SignupFormPage from "./components/session/SignupFormPage";
import NavBar from "./components/NavBar";
import EditUserForm from "./components/session/EditUserForm";
import { restoreSession } from "./store/session";
import Channel from './components/chat/Channel';
// import MapWrapper from "./components/TestMap";

function App() {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  if (!user && sessionStorage["currentUser"]) {
    // dispatch(restoreSession())
    sessionStorage.removeItem("currentUser")
  }
  const demo = user ? (
    <div>
      <span>Click the photo to edit profile</span>
      <NavLink activeStyle={{display: "none"}} to={`/userUpdate/${user.id}`}><img src={user.photoUrl}/></NavLink>
    </div>
    ) : null
  return (
    <>
      <NavBar/>
      {demo}
      <Route path="/userUpdate/:userId" component={EditUserForm} />
      <Route path="/login" component={LoginFormPage} />
      <Route path="/signup" component={SignupFormPage} />
      <Route path="/channel/:channelId" component={Channel} />
      {/* <MapWrapper /> */}
    </>

  );
}

export default App;
