import { useContext, useState } from 'react'
import { MainContext } from '../../context/MainProvider'
import { message } from 'antd'
import RegisterForm from '../RegisterForm'
import loginService from '../../services/login'
import blogService from '../../services/blogs.js'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: ''
  })
  const { user, setUser } = useContext(MainContext)

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // handle register
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const userData = await loginService.register({
        username: formData.username,
        name: formData.name,
        password: formData.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(userData))
      blogService.setToken(userData.token)
      setUser(userData)
      setFormData({ username: '', name: '', password: '' })
      message.success(`${userData.name} registered successfully`)
      console.log(`${userData.name} registered successfully`)
    } catch (error) {
      console.error('Error while register:', error.message)
      message.error('username already taken')
    }
  }

  return (
    <RegisterForm
      handleRegister={handleRegister}
      handleInputChange={handleInputChange}
      username={formData.username}
      name={formData.name}
      password={formData.password}
    />
  )
}

export default Register