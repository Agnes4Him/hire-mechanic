import { Link } from 'react-router-dom';
import { GiCancel } from "react-icons/gi";

const MenuModal = ({deleteMenuModal}) => {
    return (
        <div className="menumodal-container">
            <div className="cancel-icon"><GiCancel onClick={deleteMenuModal}/></div>
            <div className="menu-modal">
            <ul>
                <Link to="/" style={{textDecoration:'none'}}><li>Home</li></Link>
                <Link to="/join" style={{textDecoration:'none'}}><li>Join</li></Link>
                <Link to="/hire" style={{textDecoration:'none'}}><li>Hire</li></Link>
                <Link to="/signup" style={{textDecoration:'none'}}><li>Signup/Login</li></Link>
            </ul>
        </div>
        </div>
    )
}

export default MenuModal