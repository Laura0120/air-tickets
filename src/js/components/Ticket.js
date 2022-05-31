import React from "react";
import {baseUrl} from '../const'
import Flight from './Flight';

function Ticket(props) {
  const {flight} = props
  const {carrier, price, legs} = flight
  return (
    <article className={"ticket"}>
      <h3 className={"visually-hidden"}>Билет от перевозчика: {carrier.caption}</h3>
      <div className={"ticket__header"}>
        <div className={"ticket__logo"}>
          <img src={`${baseUrl}/img/airline-logos/${carrier.uid}.svg`}
               width={"80"}
               height={"23"}
               alt={`Логотип авиокомпании ${carrier.caption}`}/>
        </div>
        <div className={"ticket__price"}>
          <span className={"ticket__price-amount"}>{`${Number(price.passengerPrices[0].total.amount)} ₽` }</span>
          {price.passengerPrices[0].passengerType.uid === "ADULT" && <span className={"ticket__price-type"}>Стоимость для одного взрослого пассажира</span>}
        </div>
      </div>
      <div>
        {legs.map((item, index) => (
          <Flight key={index} leg={item}/>
        ))}
      </div>
      <a href="#" className={"ticket__button"}>Выбрать</a>
    </article>
    );
}

Ticket.propTypes = {
};

export default  Ticket;
