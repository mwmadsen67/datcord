import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/session'

const NavBar = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const handleSubmit = () => {
    dispatch(logout())
  }

  const display = user ? (
    <div>
      <h2>welcome {user.username}!</h2>
      <button onClick={handleSubmit}>Log out</button>
    </div>
    ) : (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    )

    return (
      <div className="navbar">
        <h2>Datcord</h2>
        {display}
      </div>
    )

}

export default NavBar;