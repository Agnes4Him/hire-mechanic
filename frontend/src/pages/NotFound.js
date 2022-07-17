import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileNavbar from "../components/MobileNavbar";
import Footer from '../components/Footer';

const NotFound = () => {

  return ( 
    <div className='notfound-page'>
        <Navbar />
        <MobileNavbar />
        <div className="not-found">
            <h2>Sorry,</h2>
            <p>That page can not be found</p>
            <Link to="/" style={{textDecoration:'none'}}>...Back to home page</Link>
        </div>
        <Footer />
    </div>
  );
}

export default NotFound;