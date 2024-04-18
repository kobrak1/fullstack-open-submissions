import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const MainContext = createContext()

const MainProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const propValues = { user, setUser }

  return (
    <MainContext.Provider
      value={propValues}
    >
      {children}
    </MainContext.Provider>
  )
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default MainProvider
