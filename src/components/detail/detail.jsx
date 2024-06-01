import { auth } from '../../lib/firebase'
import './detail.scss'

const Detail = () => {
    return(
        <div className='Detail'>

            <div className="user">
                <img src="/public/avatar.png" alt="" />
                <h2>Username</h2>
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

                <button>Block User</button>
                <button className='logOut' onClick={() => auth.signOut()}>Log Out</button>

            </div>

        </div>
    )
}
export default Detail