import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import {db} from '../../../../lib/firebase'
import './addUser.scss'
import { useState } from 'react';
import { useUserStore } from '../../../../lib/userStore';

const AddUser = () => {

    const {currentUser} = useUserStore()
    const[user, setUser] = useState(null)

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db,"users")
            const q = query(userRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if(!querySnapshot.empty){
                setUser(querySnapshot.docs[0].data())
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAdd = async () =>{

        const chatRef = collection(db, "chats")
        const userChatsRef = collection(db, "userChats")

        try {

            const newChatRef = doc(chatRef)

            await setDoc(newChatRef,{
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(userChatsRef, user.id),{
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage:"",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });

            await updateDoc(doc(userChatsRef, currentUser.id),{
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage:"",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });
        } 
        catch (error) {
            console.log(error);
        }
    }
    
    return(
        <div className='AddUser'>
            <form onSubmit={handleSearch}>
                <input type="search" name="username" placeholder="Username" />
                <button>Search</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={user.avatar || "/public/avatar.png"} alt="" />
                    <span>{user.username}</span>
                </div>
                <button onClick={handleAdd}>Add User</button>
                
            </div>}
        </div>
    )
}
export default AddUser