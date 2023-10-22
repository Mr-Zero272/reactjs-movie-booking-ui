import { useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './Step1.module.scss';
import RowOfSeats from './RowOfSeats';
import Seat from './Seat';
import { useEffect, useState } from 'react';
import * as cartService from '~/apiServices/cartService';
import Loading from '~/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceTired } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SeatSection({ data }) {
    const addToCartInfo = useSelector((state) => state.addToCart);
    const [loading, setLoading] = useState(false);
    const [listSeat, setListSeat] = useState([]);
    const screeningId = addToCartInfo.activeShowtime;
    const auditoriumId = addToCartInfo.activeAuditorium;
    //console.log(addToCartInfo);
    //console.log(screeningId, auditoriumId, 'asdfasdfsadfasdfsdfasdfas');
    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            setLoading(true);
            if (screeningId === 0 || auditoriumId === 0) {
                setListSeat([]);
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
                return;
            } else {
                const result = await cartService.getAllSeat(screeningId, auditoriumId);
                //console.log(result);
                setListSeat(result);
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        };
        fetchApi();
    }, [screeningId, auditoriumId]);
    //lay cai auditorium call api lay ds seats
    const listRowSeat = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
        <>
            <div className={cx('screen-section')}>
                <div className={cx('screen')}></div>
                <p>SCREEN</p>
            </div>
            <div className={cx('seats-section')}>
                {loading === false ? (
                    listSeat?.length === 0 ? (
                        <div className={cx('note')}>
                            <div className={cx('attention')}></div>
                            <p>
                                <FontAwesomeIcon icon={faFaceTired} /> We are so sorry! This movie is not playing in
                                this auditorium!
                            </p>
                        </div>
                    ) : (
                        listRowSeat.map((item) => (
                            <RowOfSeats
                                key={item}
                                rowSeat={item}
                                listSeats={listSeat.filter((it) => it.rowSeat === item)}
                            />
                        ))
                    )
                ) : (
                    <Loading />
                )}
                {listSeat?.length !== 0 && (
                    <div className={cx('seats-section-note')}>
                        <div className={cx('seats-section-note-item')}>
                            <Seat />
                            <p>Available</p>
                        </div>
                        <div className={cx('seats-section-note-item')}>
                            <Seat selected />
                            <p>Selected</p>
                        </div>
                        <div className={cx('seats-section-note-item')}>
                            <Seat booked />
                            <p>Booked</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SeatSection;
