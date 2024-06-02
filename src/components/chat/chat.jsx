import EmojiPicker from 'emoji-picker-react'
import './chat.scss'
import { useEffect, useRef, useState } from 'react'
import { doc, getDoc, onSnapshot, updateDoc,arrayUnion } from 'firebase/firestore'
import {db} from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'

const Chat = () => {

    const[chat, setChat] = useState();
    const[open,setOpen]=useState(false)
    const[text,setText]=useState("")
    const {chatId, user} = useChatStore();
    const {currentUser} = useUserStore();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "instant" });

    },[]);

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db,"chats", chatId),
        (res) => {
            setChat(res.data())
        });

    return () =>{
        unSub()
    }
    },[chatId])

    const handleEmoji = (e) =>{
        setText(text+" "+e.emoji)
        setOpen(!open)
    }

    const handleSend = async () =>{
        if(text === "") return;

        try {
            
            console.log("chatId:", chatId);
            console.log("text:", text);

            await updateDoc(doc(db, "chats", chatId),{
                messages: arrayUnion(
                    {
                        senderId : currentUser.id,
                        text:text,
                        timestamp: new Date(),
                    }),
            });

            const userIds = [currentUser.id, user.id];

            userIds.forEach(async (id) => {
                const userChatsRef = doc(db,"userChats",id)
                const userChatsSnapShot = await getDoc(userChatsRef)

                if(userChatsSnapShot.exists()){
                    const userChatsData = userChatsSnapShot.data();

                    console.log("userChatsSnapShot:", userChatsSnapShot);
                    console.log("userChatsData:", userChatsData);
                    
                    const chatIndex = userChatsData.chats.findIndex(
                        (chat) => chat.chatId === chatId
                    );

                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatsRef,{
                        chats: userChatsData.chats,
                    });
                }
            })

        } 
        catch (error) {
        console.log(error);
        console.error(error);    
        }
    }

    return(
        <div className='Chat'>
            <div className="top">
                <div className="user">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <span>Username</span>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="/public/phone.png" alt="" />
                    <img src="/public/video.png" alt="" />
                    <img src="/public/info.png" alt="" />
                </div>
            </div>
                <div className="center">
                {chat?.messages?.map((message) => (
                <div className="message own" key={message?.createAt}>
                    <div className="texts">
                        {message.img && <img src={message.img} alt="" />}
                        <p>{message.text}</p>
                        {/* <span>{message}</span> */}
                    </div>
                </div>
            ))}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="/public/img.png" alt="" />
                    <img src="/public/camera.png" alt="" />
                    <img src="/public/mic.png" alt="" />
                </div>
                <input type="text" placeholder='Type a message....' 
                value={text}
                onChange={(e)=>setText(e.target.value)}/>
                <div className="emojis">
                    <img src="/public/emoji.png" alt="" 
                    onClick={() => setOpen(!open)}/>
                    <div className="picker">
                    <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}
export default Chat