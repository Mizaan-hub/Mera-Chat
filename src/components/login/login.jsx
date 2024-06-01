import { useState } from 'react'
import './login.scss'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { auth, db } from '../../lib/firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import upload from '../../lib/upload'

const Login = () => {

    const [avatar,setAvatar] = useState({
        file:null,
        url:""
    })

    const[loading, setLoading] = useState(false)

    const handleAvatar = e => {
        e.preventDefault()

        if (e.target.files[0]) {
            setAvatar({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)
        const {email, password} = Object.fromEntries(formData)

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
            console.error(error);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)
        const { username, email, password} = Object.fromEntries(formData);

        // VALIDATE INPUTS
    if (!username || !email || !password)
        return toast.warn("Please enter inputs!");
    if (!avatar.file) return toast.warn("Please upload an avatar!");

      // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return toast.warn("Select another username");
    }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const imgURL = await upload(avatar.file)
            await setDoc(doc(db,"users",userCredential.user.uid),{
                username,
                email,
                avatar: imgURL,
                id: userCredential.user.uid,
                blocked:[]
            });

            await setDoc(doc(db,"userChats",userCredential.user.uid),{
                chats:[]
            })

            toast.success("Account Created Successfully! "+username)
            toast.success("You Can Log In Now")
        } catch (error) {
            console.log(error);
            console.error(error);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className='Login'>
            <div className="item">
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder="Enter Your Email"/>
                    <input type="password" name="password" placeholder="Enter Your Password"/>
                    <button disabled={loading}>{loading? "Loading.." : 'Sign In'}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
            <h2>Create An Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || '/public/avatar.png'} alt="" />
                        Upload your Avatar</label>
                    <input type="file" name="" id="file" 
                    style={{display:"none"}}
                    onChange={handleAvatar}/>
                    <input type="text" name="username" placeholder="Enter Your Username"/>
                    <input type="email" name="email" placeholder="Enter Your Email"/>
                    <input type="password" name="password" placeholder="Enter Your Password"/>
                    <button disabled={loading}>{loading? "Loading.." : 'Sign Up'}</button>

                </form>
            </div>
        </div>
    )
}
export default Login