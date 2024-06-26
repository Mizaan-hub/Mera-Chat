import { useEffect, useState } from 'react';
import './chatList.scss'
import AddUser from './addUser/addUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';


const ChatList = () => {

    const[addMode, setAddMode] = useState(false);
    const[chats, setChats] = useState([]);
    const[input, setInput] = useState("");

    const {currentUser} = useUserStore();
    const {changeChat, chatId} = useChatStore();

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

        const userChats = chats.map((item) => {
            const {user, ...rest} = item;
            return rest
        });

        const chatIndex = userChats.findIndex(item => item.chatId == chat.chatId)
        userChats[chatIndex].isSeen = true

        const userChatsRef = doc(db,"userChats",currentUser.id)

        try {
            await updateDoc(userChatsRef,{
                chats:userChats
            })
        changeChat(chat.chatId, chat.user)
        } 
        catch (error) {
        console.log(error);    
        }

    }

    const filteredChats = chats.filter(
        (chat) => chat.user.username.toLowerCase().includes(input.toLowerCase())
    )

    return(
        <div className='ChatList'>

            <div className="search">
                <div className="searchBar">
                    <img src="/public/search.png" alt="" />
                    <input type="search"  placeholder='Search'
                    onChange={(e) => setInput(e.target.value)}/>
                </div>
                <img src={addMode ? 
                    "/public/minus.png":
                    "/public/plus.png"} 
                    alt="" className='add' 
                    onClick={() => setAddMode(!addMode)}/>
            </div>
                
                {filteredChats.map(chat => (
                    <div className="item" 
                    key={chat.chatId} 
                    onClick={() => handleSelect(chat)}
                    style={{
                        backgroundColor : chat?.isSeen ? "transparent" : "var(--btn-color)",
                    }}
                    >
                    <img src={chat.user.blocked.includes(currentUser.id)
                        ?"/public/avatar.png"
                        : chat.user.avatar ||"/public/avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user.blocked.includes(currentUser.id)
                        ?"Blocked User"
                        :chat.user.username}</span>
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