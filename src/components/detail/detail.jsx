import { arrayRemove, arrayUnion, doc, onSnapshot, query, where, updateDoc, collection } from 'firebase/firestore';
import { useChatStore } from '../../lib/chatStore'
import { auth, db} from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore';
import './detail.scss'
import { useEffect, useState } from 'react';

const Detail = () => {

    const[show, setShow] =useState(false)
    const{chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();
    const{currentUser} = useUserStore();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "chats", chatId, "messages"), where("type", "==", "image"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            messages.push(doc.data());
        });

        setMessages(messages);
        });
        return () => unsubscribe();
    }, [chatId]);


    const handleBlock = async () => {
        if (!user) return;
    
        const userDocRef = doc(db, "users", currentUser.id);
    
        try {
        await updateDoc(userDocRef, {
            blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
        });
        changeBlock();
        } 
        catch (error) {
            console.log(error);
        }
    };

    const handleClick = () => {
        setShow(!show)
    }

    return(
        <div className='Detail'>

            <div className="user">
                <img src={user?.avatar||"/public/avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="info">

                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="/public/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="/public/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src={show?"/public/arrowUp.png" :"/public/arrowDown.png"} alt="" 
                        onClick={handleClick}/>
                    </div>
                    <div className="photos" style={{ display: show? 'none' : 'block' }}>
                        {messages.map((message, index) => (
                            message.type === 'image' &&
                            <div className="photoItem" key={index}>
                                <div className="photoDetail">
                                    <img src={message.url} alt="" />
                                        <span>{message.caption}</span>
                                </div>
                            <img src="/public/download.png" alt="" className='icon' />
                            </div>
                            ))}
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="/public/arrowUp.png" alt="" />
                    </div>
                </div>

                <button onClick={handleBlock}>
                {isCurrentUserBlocked
                ? "You are Blocked!"
                : isReceiverBlocked
                ? "User blocked"
                : "Block User"}
                </button>

                <button className='logOut' onClick={() => auth.signOut()}>Log Out</button>

            </div>

        </div>
    )
}
export default Detail