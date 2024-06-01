import { useState } from 'react';
import './chatList.scss'
import AddUser from './addUser/addUser';


function ChatList (){

    const[addMode, setAddMode] = useState(false);

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

        {addMode && <AddUser/>}

        </div>
    )
}
export default ChatList