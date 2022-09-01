import LoginFormPage from "./components/LoginFormPage";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Route path="/login" component={LoginFormPage}/>
    </>

  );
}

export default App;
