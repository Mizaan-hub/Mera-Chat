import Chat from "./components/chat/chat"
import Detail from "./components/detail/detail"
import List from "./components/list/list"
import Login from "./components/login/login"
import Notification from "./components/notification/notification"


const App = () => {

  const user = false

  return (
    <div className='container'>
      {
        user ? (
          <>
          <List/>
        <Chat/>
        <Detail/>
          </>
        ):(
          <Login/>
        )}
        <Notification/>
    </div>
  )
}

export default App