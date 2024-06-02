import EmojiPicker from 'emoji-picker-react'
import './chat.scss'
import { useEffect, useRef, useState } from 'react'
import { doc, getDoc, onSnapshot, updateDoc,arrayUnion } from 'firebase/firestore'
import {db} from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import upload from '../../lib/upload'
import {format} from "timeago.js"

const Chat = () => {

    const[chat, setChat] = useState();
    const[open,setOpen]=useState(false)
    const[text,setText]=useState("")
    const[img, setImg] = useState({
        file: null,
        url : ""
    })
    const {chatId, user, isCurrentUserBlocked, isReceiverBlocked} = useChatStore();
    const {currentUser} = useUserStore();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "instant" });

    },[chat?.messages]);

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db,"chats", chatId),
        (res) => {
            setChat(res.data());
        });

    return () =>{
        unSub()
    }
    },[chatId])

    const handleEmoji = (e) =>{
        setText(text+" "+e.emoji)
        setOpen(!open)
    }

    const handleImg = e => {
        e.preventDefault()

        if (e.target.files[0]) {
            setImg({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleSend = async () =>{
        if(text === "") return;

        let imgUrl = null

        try {
            
            console.log("chatId:", chatId);
            console.log("text:", text);

            if(img.file){
                imgUrl = await upload(img.file)
            }

            await updateDoc(doc(db, "chats", chatId),{
                messages: arrayUnion(
                    {
                        senderId : currentUser.id,
                        text:text,
                        timestamp: new Date(),
                        ...(imgUrl && {img:imgUrl})
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

        setImg({
            file: null,
            url: null,
        })

        setText("")
    }

    return(
        <div className='Chat'>
            <div className="top">
                <div className="user">
                    <img src={user?.avatar||"/public/avatar.png"} alt="" />
                    <div className="texts">
                        <span>{user?.username}</span>
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
                <div className={message.senderId === currentUser.id ? "message own": "message"} 
                key={message?.createAt}>
                    <div className="texts">
                        {message.img && <img src={message.img} alt="" />}
                        <p>{message.text}</p>
                        <span>{format(message?.createdAt?.time)}</span>
                    </div>
                </div>
            ))}
            {img.url && 
            <div className="message own">
                <div className="texts">
                    <img src={img.url} alt="" />
                </div>
            </div>}
            <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="/public/img.png" alt="" />
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={handleImg}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}/>
                    <img src="/public/camera.png" alt="" />
                    <img src="/public/mic.png" alt="" />
                </div>
                <input type="text" placeholder={
                    isCurrentUserBlocked || isReceiverBlocked 
                    ?'You Cannot Send Messages'
                    :'Type a message....' }
                value={text}
                onChange={(e)=>setText(e.target.value)}
                disabled={isCurrentUserBlocked || isReceiverBlocked}/>
                <div className="emojis">
                    <img src="/public/emoji.png" alt="" 
                    onClick={() => setOpen(!open)}/>
                    <div className="picker">
                    <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton" onClick={handleSend}
                disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
            </div>
        </div>
    )
}
export default Chat