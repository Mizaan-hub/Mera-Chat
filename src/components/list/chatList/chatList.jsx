import { useEffect, useState } from 'react';
import './chatList.scss'
import AddUser from './addUser/addUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';


const ChatList = () => {

    const[addMode, setAddMode] = useState(false);
    const[chats, setChats] = useState([]);

    const {currentUser} = useUserStore();
    const {changeChat} = useChatStore();

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, "userChats", currentUser.id),
            async (res) => {
                const data = res.data();

                if(data && data.chats){
                    const items = data.chats;
                    const promises = items.map(async (item) => {
                        const userDocRef = doc(db, "users", item.receiverId);
                        const userDocSnap = await getDoc(userDocRef);
            
                        const user = userDocSnap.data();
            
                        return { ...item, user };
                    });

                const chatData = await Promise.all(promises);
    
                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            }
        }
        );
    
        return () => {
        unSub();
        };
    }, [currentUser.id]);

    const handleSelect = async (chat) =>{
        changeChat(chat.chatId, chat.user)
    }

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
                    <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)}>
                    <img src={chat.user.avatar ||"/public/avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user.username}</span>
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