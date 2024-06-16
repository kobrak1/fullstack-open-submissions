import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from "react"

export const MainContext = createContext()

export const MainProvider = ({children}) => {
    const [isAdded, setIsAdded] = useState(false)
    const [isVoted, setIsVoted] = useState(false)

    useEffect(() => {
        setTimeout(() => setIsAdded(false), 5000)
    }, [isAdded])

    useEffect(() => {
        setTimeout(() => setIsVoted(false), 5000)
    }, [isVoted])

    const values = {
        setIsAdded,
        setIsVoted,
    }

    return (
        <MainContext.Provider value={values}>
            {children}
        </MainContext.Provider>
    )
}

MainProvider.propTypes = {
    children: PropTypes.node
}