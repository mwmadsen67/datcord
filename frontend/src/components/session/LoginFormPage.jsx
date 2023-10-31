import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/session'
import { Redirect } from 'react-router-dom'

const LoginFormPage = (props) => {

  const dispatch = useDispatch();
  // const loggedIn = useSelector(state => state.session.user)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // console.log('hello')

  // if (loggedIn) {
  //   return <Redirect to="/" />
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      user: {
        email: email,
        password: password
      }
    }

    dispatch(login(data));

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
        <label>Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>

        <input type="submit" value="Log In" />
      </form>
    </div>
  )

}

export default LoginFormPage;