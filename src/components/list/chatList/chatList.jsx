import { useEffect, useState } from 'react';
import './chatList.scss'
import AddUser from './addUser/addUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';


const ChatList = () => {

    const[addMode, setAddMode] = useState(false);
    const[chats, setChats] = useState([]);

    const {currentUser} = useUserStore()

    useEffect (() => {
        const unSub = onSnapshot(
            doc(db, "userChats", currentUser.id), 
            async (userCredential) => {
            const items = userCredential.data().chats;

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiver.id)
                const userDocSnap = await getDoc(userDocRef);

                const user =  userDocSnap.data()

                return{
                    ...item, user
                };
            });

            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a,b) => b.updateAt - a.updateAt))
            }
        );

        return () => {
            unSub()
        }
    },[currentUser.id])

    return(
        <div className='ChatList'>

            <div className="search">
                <div className="searchBar">
                    <img src="/public/search.png" alt="" />
                    <input type="search"  placeholder='Search'/>
                </div>
                <img src={addMode ? 
                    "/public/minus.png":
                    "/public/plus.png"} 
                    alt="" className='add' 
                    onClick={() => setAddMode(!addMode)}/>
            </div>
                
                {chats.map(chat => (
                    <div className="item" key={chat.chatId}>
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <span>UserName</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
                ))}
            {/* <div className="item">
                <img src="/public/avatar.png" alt="" />
                <div className="texts">
                    <span>UserName</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="item">
                <img src="/public/avatar.png" alt="" />
                <div className="texts">
                    <span>UserName</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="item">
                <img src="/public/avatar.png" alt="" />
                <div className="texts">
                    <span>UserName</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="item">
                <img src="/public/avatar.png" alt="" />
                <div className="texts">
                    <span>UserName</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="item">
                <img src="/public/avatar.png" alt="" />
                <div className="texts">
                    <span>UserName</span>
                    <p>Hello World</p>
                </div>
            </div> */}

        {addMode && <AddUser/>}

        </div>
    )
}
export default ChatList