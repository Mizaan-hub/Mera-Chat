import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../lib/chatStore'
import { auth, db } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore';
import './detail.scss'

const Detail = () => {
    const{chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();
    const{currentUser} = useUserStore();

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
                        <img src="/public/arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="/public/pics/sample-lana-1.jpg" alt="" />
                                <span>sample-lana-1.jpg</span>
                            </div>
                            <img src="/public/download.png" alt="" className='icon'/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="/public/pics/sample-lana-2.jpg" alt="" />
                                <span>sample-lana-1.jpg</span>
                            </div>
                            <img src="/public/download.png" alt="" className='icon' />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="/public/pics/sample-neha-1.jpg" alt="" />
                                <span>sample-neha-1.jpg</span>
                            </div>
                            <img src="/public/download.png" alt="" className='icon' />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="/public/pics/sample-neha-2.jpg" alt="" />
                                <span>sample-neha-2.jpg</span>
                            </div>
                            <img src="/public/download.png" alt="" className='icon' />
                        </div>
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