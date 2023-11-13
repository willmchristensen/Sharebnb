import './Footer.css';
import FooterPortraitButtons from './FooterButtons';

function Footer(){
    return(
        <footer className="main-footer-wrapper">
            <div className="main-footer-container">
                <div className="footer-content">
                    <h2 className="footer-title">
                        Will
                    </h2>
                    <span className='footer-subtitle'>
                        Fullstack Developer
                    </span>
                </div>
                <div className="footer-content">
                    <FooterPortraitButtons />
                </div>
            </div>
        </footer>
    )
}

export default Footer;