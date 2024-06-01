import './addUser.scss'

function AddUser (){
    return(
        <div className='AddUser'>
            <form action="">
                <input type="search" name="username" placeholder="Username" />
                <button>Search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="/public/avatar.png" alt="" />
                    <span>Username</span>
                </div>
                <button>Add User</button>
                
            </div>
        </div>
    )
}
export default AddUser