import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/session'
import { Redirect } from 'react-router-dom'

const SignupFormPage = (props) => {

  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.session.user)

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (loggedIn) {
    return <Redirect to="/" />
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      user: {
        email: email,
        username: username,
        password: password
      }
    }

    dispatch(signup(data));

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>Username
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>

        <input type="submit" value="Sign Up" />
      </form>
    </div>
  )

}

export default SignupFormPage;