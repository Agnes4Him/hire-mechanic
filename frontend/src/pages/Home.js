
import Navbar from '../components/Navbar';
import MobileNavbar from '../components/MobileNavbar';
import HomeContent from '../components/HomeContent';
import Footer from '../components/Footer';

const Home = () => {

    return (
        <div>
            <Navbar />
            <MobileNavbar />
            <HomeContent />
            <Footer />
        </div>
    );
}

export default Home;