import ChatList from './chatList/chatList'
import './list.scss'
import UserInfo from './userInfo/userInfo'

const List = () =>{
    return(
        <div className='List'>
            <UserInfo/>
            <ChatList/>
        </div>
    )
}
export default List