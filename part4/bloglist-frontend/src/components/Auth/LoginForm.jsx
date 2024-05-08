import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, handleInputChange }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="username">
          <input
            data-testid="username"
            type="text"
            value={username}
            name="username"
            onChange={(e) => handleInputChange(e)}
            placeholder="username"
          />
        </div>
        <div className="password">
          <input
            data-testid="password"
            type="password"
            value={password}
            name="password"
            onChange={(e) => handleInputChange(e)}
            placeholder="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default LoginForm
