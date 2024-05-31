import './userInfo.scss'

function UserInfo (){
    return(
        <div className='UserInfo'>
            <div className="user">
                <img src="/public/avatar.png" alt="" />
                <h2>Username</h2>
            </div>
            <div className="icons">
                <img src="/public/more.png" alt="" />
                <img src="/public/video.png" alt="" />
                <img src="/public/edit.png" alt="" />
            </div>
        </div>
    )
}
export default UserInfo