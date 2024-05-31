import { useState } from 'react';
import './chatList.scss'

function ChatList (){

    const[addMode, setAddMode] = useState(false);

    return(
        <div className='ChatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/public/search.png" alt="" />
                    <input type="search"  placeholder='Search'/>
                </div>
                <img src={addMode? "/public/minus.png":"/public/plus.png"} alt="" className='add' onClick={ ()=> setAddMode(!addMode)}/>
            </div>
        </div>
    )
}
export default ChatList