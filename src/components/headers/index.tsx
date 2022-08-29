import { useEffect, useState } from 'react'
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
export const Header = () => {
  const navigate = useNavigate()
  const [isLogin, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLogin(!!token);
  })
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('info');
    setLogin(false);
    navigate('/')
  }

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`,
        data: { email, password }
      })
      localStorage.setItem('token', data.token);
      localStorage.setItem('info', JSON.stringify(data.data))
      setLogin(true)
    } catch (e: any) {
      setLogin(false)
      alert(e.response.data.message)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        data: { email, password }
      })
      return login(email, password)
    } catch (e: any) {
      setLogin(false)
      alert(e.response.data.message)
    }
  }
  const renderForm = () => {
    if (isLogin) {
      const info: any = JSON.parse(localStorage.getItem('info') as string)
      return (<div className="form">
        <p>Welcome <b>{info.email || 'noname'}</b></p>
        <button className="form-button" onClick={() => navigate('/share')}>Share a movie</button>
        <button className="form-button" onClick={logout}>Logout</button>
      </div>)
    }
    return (<div className="form">
    <input type="text" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
    <input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
    <button className="form-button" onClick={(e) => login(email, password)}>Login</button>
    <button className="form-button" onClick={(e) => signUp(email, password)}>Signup</button>
  </div>)
  }
  return (<div className="header">
  <h2>Funny Movies</h2>
  {renderForm()}
</div>)
}