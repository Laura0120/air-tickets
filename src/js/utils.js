export const extend = (a, b) => {
    return Object.assign({}, a, b);
};

const sumTravelTime = (sum, el) => {
    const totalValue = sum + el.duration;
    return totalValue
}

export const getMaxCountSegmentsFlight = (flight) => {
  return Math.max(...flight.legs.map(({ segments }) => segments.length));
}

export const ascendingPriceSort = (a, b) => {
    return Number(a.flight.price.passengerPrices[0].total.amount) - Number(b.flight.price.passengerPrices[0].total.amount);
}

export const descendingPriceSort = (a, b) => {
    return Number(b.flight.price.passengerPrices[0].total.amount) - Number(a.flight.price.passengerPrices[0].total.amount);
}

export const travelTimeSort = (a, b) => {
    return a.flight.legs.reduce(sumTravelTime, 0) - b.flight.legs.reduce(sumTravelTime, 0);
}

export const adaptFilterLabelBySegments = (countOfSegments) => {
    let label = '';
    switch (countOfSegments) {
    case 1:
       label = 'без пересадок';
       break;
    case 2:
        label = '1 пересадка';
        break;
    case 3:
        label = '2 пересадки';
        break;
    default:
        return label;
    }
 return label
}

export const getHoursAndMinutes = (minutes) => {
    const remainingMinutes = minutes % 60;
    const hours = Math.trunc(minutes/60);

    return `${hours} ч ${remainingMinutes} мин`;
}
