import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck, faSquareXmark, faXmark, faTag } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import styles from './Ticket.module.scss';
import Image from '~/components/Image';
import * as cartService from '~/apiServices/cartService';

const cx = classNames.bind(styles);

const dF = () => {};
function CartItem({ data, checked = false, onSelect = dF, onDelete = dF }) {
    //const [checked, setChecked] = useState(false);
    //console.log(data);

    const handleCheck = () => {
        //setChecked(!checked);
        onSelect(data.seatStatus.id);
    };

    const handleDeleteTicket = (id) => {
        Swal.fire({
            title: 'Are you sure to delete this ticket?',
            text: "You won't be able to revert this! ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const callApi = async () => {
                    const token = localStorage.getItem('token');
                    const ids = [id];
                    const result = await cartService.deleteTicketById(token, ids);
                    //console.log(result); {message: 'success'}
                    if (result.message && result.message === 'success') {
                        onDelete();
                        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                    } else {
                        Swal.fire('Opps!', 'Some thing went wrong!', 'warning');
                    }
                };

                callApi();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire('Cancelled', 'Your ticket is still available!', 'error');
            }
        });
    };

    const showTime = new Date(data.seatStatus.screening.screening_start);
    return (
        <div className={cx('cart-item-wrapper')}>
            {data.seatStatus.status === 'booked' && (
                <Tippy content="This ticket has already been booked by someone!" maxWidth="150px" theme="light">
                    <div className={cx('booked-label')}>
                        <FontAwesomeIcon icon={faTag} /> Booked
                    </div>
                </Tippy>
            )}
            <div className={cx('cart-item-checkbox')}>
                {data.seatStatus.status === 'available' ? (
                    <div className={cx('check-box')} onClick={handleCheck}>
                        {!checked && <FontAwesomeIcon icon={faSquare} />}
                        {checked && <FontAwesomeIcon className={cx('checked')} icon={faSquareCheck} />}
                    </div>
                ) : (
                    <Tippy content="This ticket has already been booked by someone!" maxWidth="150px" theme="light">
                        <div className={cx('check-box')} style={{ cursor: 'not-allowed' }}>
                            <FontAwesomeIcon className={cx('booked')} icon={faSquareXmark} />
                        </div>
                    </Tippy>
                )}
            </div>
            <div className={cx('cart-item-body')}>
                {/* <img className={cx('cart-item-img')} src={images.zongli} alt="movie-img" /> */}
                <Image
                    className={cx('cart-item-img')}
                    src={'http://localhost:8081/movie/images/' + data.imageName}
                    alt="movie-img"
                />
                <div className={cx('cart-item-details')}>
                    <div className={cx('cart-item-details-movie')}>
                        <div className={cx('movie-detail')}>
                            <p>{data.movieName}</p>
                        </div>
                        <div className={cx('movie-detail')}>
                            <p>{data.director}</p>
                        </div>
                    </div>
                    <div className={cx('cart-item-details-ticket')}>
                        <div className={cx('ticket-detail')}>
                            <p>Row</p>
                            <p>{data.seatStatus.seat.rowSeat}</p>
                        </div>
                        <div className={cx('ticket-detail')}>
                            <p>Seat</p>
                            <p>{data.seatStatus.seat.numberSeat}</p>
                        </div>
                        <div className={cx('ticket-detail')}>
                            <p>Date</p>
                            <p>
                                {showTime.toLocaleDateString('en-us', { month: 'short' })} {showTime.getDate()}
                            </p>
                        </div>
                        <div className={cx('ticket-detail')}>
                            <p>Time</p>
                            <p>
                                {showTime.getHours()}:
                                {showTime.getMinutes() < 10 ? '0' + showTime.getMinutes() : showTime.getMinutes()}
                            </p>
                        </div>
                        <div className={cx('ticket-detail')}>
                            <p>Price</p>
                            <p>{data.seatStatus.price / 1000}k</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('cart-item-feature-btn')}>
                <button onClick={() => handleDeleteTicket(data.id)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
