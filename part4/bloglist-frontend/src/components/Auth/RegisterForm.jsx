import PropTypes from 'prop-types'

const RegisterForm = ({ handleRegister, username, name, password, handleInputChange }) => {
  return (
    <div>
      <form onSubmit={handleRegister}>
        <div className="username">
          <input
            type="text"
            value={username}
            name="username"
            onChange={(e) => handleInputChange(e)}
            placeholder="username"
          />
        </div>
        <div className="name">
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => handleInputChange(e)}
            placeholder="name"
          />
        </div>
        <div className="password">
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => handleInputChange(e)}
            placeholder="password"
          />
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  )
}

RegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default RegisterForm
