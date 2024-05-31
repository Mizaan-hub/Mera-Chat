import { useState } from 'react'
import './login.scss'

function Login (){

    const [avatar,setAvatar] = useState({
        file:null,
        url:""
    })

    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }
    }

    return(
        <div className='Login'>
            <div className="item">
                <h2>Welcome Back</h2>
                <form action="">
                    <input type="email" name="email" placeholder="Enter Your Email" id="" />
                    <input type="password" name="password" placeholder="Enter Your Password" id="" />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
            <h2>Create An Account</h2>
                <form action="">
                    <label htmlFor="file">
                        <img src={avatar.url || '/public/avatar.png'} alt="" />
                        Upload your Avatar</label>
                    <input type="file" name="" id="file" 
                    style={{display:"none"}}
                    onChange={handleAvatar}/>
                    <input type="text" name="username" placeholder="Enter Your Username" id="" />
                    <input type="email" name="email" placeholder="Enter Your Email" id="" />
                    <input type="password" name="password" placeholder="Enter Your Password" id="" />
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}
export default Login