import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"

const Notification = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notifications)

    // this effect hook sets a timer shenever a new one dispatched
    useEffect(() => {
      if(notification) {
        const timer = setTimeout(() => {
          dispatch(clearNotification())
        }, 3000)
        return () => clearTimeout(timer)
      }
    }, [notification, dispatch])

    // style object for a notification
    const style = {
        display: 'flex',
        minWidth: '30%',
        minHeight: '1rem',
        margin: '.5rem 0',
        padding: '.5rem',
        border: '1px solid gray',
        borderWidth: 1,
        visibility: notification ? 'visible' : 'hidden',
    }

  return (
    <div style={style}>
        {notification}
    </div>
  )
}

export default Notification
