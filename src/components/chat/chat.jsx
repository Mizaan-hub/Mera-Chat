import EmojiPicker from 'emoji-picker-react'
import './chat.scss'
import { useEffect, useRef, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import {db} from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'

const Chat = () => {

    const[chat, setChat] = useState();
    const[open,setOpen]=useState(false)
    const[text,setText]=useState("")
    const {chatId} = useChatStore();

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
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <img src="/public/pics/sample-lana-1.jpg" alt="" />
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="/public/pics/sample-lana-2.jpg" alt="" />
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <img src="/public/pics/sample-neha-1.jpg" alt="" />
                        <span>Just Now</span>
                    </div>
                </div>
                <div className="message own">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <img src="/public/pics/sample-neha-2.jpg" alt="" />
                        <span>Just Now</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/public/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere repellendus atque nulla ex nobis eveniet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
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
                <button className="sendButton">Send</button>
            </div>
        </div>
    )
}
export default Chat