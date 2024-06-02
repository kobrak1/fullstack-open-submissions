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
        width: '30%',
        border: 'solid',
        padding: 10,
        margin: '1rem 0',
        borderWidth: 1,
        display: notification ? 'block' : 'none',
    }

  return (
    <div style={style}>
        {notification}
    </div>
  )
}

export default Notification
