import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('footer-col')}>
                        <h4>company</h4>
                        <ul>
                            <li>
                                <a href="/">about us</a>
                            </li>
                            <li>
                                <a href="/">our services</a>
                            </li>
                            <li>
                                <a href="/">privacy policy</a>
                            </li>
                            <li>
                                <a href="/">affiliate program</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footer-col')}>
                        <h4>get help</h4>
                        <ul>
                            <li>
                                <a href="/">FAQ</a>
                            </li>
                            <li>
                                <a href="/ticket?_type=ticket&tab=1">shipping</a>
                            </li>
                            <li>
                                <a href="/">returns</a>
                            </li>
                            <li>
                                <a href="//ticket?_type=ticket&tab=1">order status</a>
                            </li>
                            <li>
                                <a href="/">payment options</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footer-col')}>
                        <h4>online shop</h4>
                        <ul>
                            <li>
                                <a href="/ticket?_type=ticket&tab=1">ticket</a>
                            </li>
                            <li>
                                <a href="/map">fast food</a>
                            </li>
                            <li>
                                <a href="/">Souvenirs</a>
                            </li>
                            <li>
                                <a href="/">Other</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footer-col')}>
                        <h4>follow us</h4>
                        <div className={cx('social-links')}>
                            <a href="/">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="/">
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                            <a href="/">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="/">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
