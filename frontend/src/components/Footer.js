import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {

    return (
        <div className="footer-container">
            <div className="contact-socials">
                <div className="contact">
                    <p className="contact-text">Contact Us</p>
                    <hr></hr>
                    <p className="contact-number">+123456789</p>
                </div>
                <div className="socials">
                    <p>Follow Us</p>
                    <hr></hr>
                    <div>
                        <p><FaFacebookF /></p>
                        <p><FaTwitter /></p>
                        <p><FaInstagram /></p>
                    </div>
                </div>
                <div className="email">
                    <p className="email-text">Email Us</p>
                    <hr></hr>
                    <p className="email-main">mechastar@example.com</p>
                </div>
            </div>
            <p className="copyright">Copyright &copy; 2022 Noble Haven. All Rights Reserved.</p>
        </div>
    )
}

export default Footer;