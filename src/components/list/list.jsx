import ChatList from './chatList/chatList'
import './list.scss'
import UserInfo from './userInfo/userInfo'

function List (){
    return(
        <div className='List'>
            <UserInfo/>
            <ChatList/>
        </div>
    )
}
export default List