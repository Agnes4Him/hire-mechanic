import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const MobileNav = ({showMenuModal}) => {
    return (
        <div className="mobilenav-container">
            <nav className="mobilenav-components">
                <Link to="/" style={{textDecoration:'none'}}><h2>Mecha<span className="star">Star</span></h2></Link>
                <h3><GiHamburgerMenu onClick={showMenuModal} /></h3>
            </nav>
        </div>
    )
}

export default MobileNav