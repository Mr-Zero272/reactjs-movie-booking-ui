import { useState, useEffect } from 'react';
import Ticket from '~/components/Ticket';
import * as cartService from '~/apiServices/cartService';

function ListTicket({ userInfo }) {
    const [listBookedTickets, setListBookedTickets] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const token = localStorage.getItem('token');
            const resultListTickets = await cartService.getListBookedTicketsByUser(token);
            //console.log(resultListTickets);
            setListBookedTickets(resultListTickets);
        };

        fetchApi();
    }, []);
    return (
        <div>
            {listBookedTickets.map((item) => {
                const date = new Date(item.seatStatus.screening.screening_start);
                const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

                return (
                    <Ticket
                        key={item.seatStatus.seat.id}
                        rowSeat={item.seatStatus.seat.rowSeat}
                        numberSeat={item.seatStatus.seat.numberSeat}
                        date={date.getDate()}
                        month={date.toLocaleDateString('en-us', { month: 'short' })}
                        type={item.seatStatus.screening.type}
                        movieName={item.movieName}
                        userInfo={{ username: item.nameInTicket, email: item.emailInTicket }}
                        imgUrl={'http://localhost:8081/movie/images/' + item.imageHorizonName}
                        startTime={hours + ':' + minutes}
                    />
                );
            })}
        </div>
    );
}

export default ListTicket;
