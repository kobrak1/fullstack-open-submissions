import Login from './Login'
import Register from './Register'

const Auth = () => {
  return (
    <div className="authentication" style={{ display:'flex', justifyContent:'center' }}>
      <Login />
      <Register />
    </div>
  )
}

export default Auth