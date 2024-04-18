import { useContext, useState } from 'react'
import loginService from '../../services/login'
import blogService from '../../services/blogs'
import LoginForm from '../LoginForm'
import { message } from 'antd'
import { MainContext } from '../../context/MainProvider'

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const { user, setUser } = useContext(MainContext)

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userInfo = await loginService.login({
        username: formData.username,
        password: formData.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(userInfo))
      blogService.setToken(userInfo.token)
      setUser(userInfo)
      setFormData({ username: '', password: '' })
      message.success(`${userInfo.name} logged in successfully`)
      console.log(`${userInfo.name} logged in successfully`)
    } catch (error) {
      console.error('Error while loggin in:', error.message)
      message.error('Invalid username or password')
    }
  }

  return (
    <LoginForm
      handleLogin={handleLogin}
      username={formData.username}
      password={formData.password}
      handleInputChange={handleInputChange}
    />
  )
}

export default Login