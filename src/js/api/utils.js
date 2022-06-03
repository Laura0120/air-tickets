import initialData from "./flights.json";
import {ascendingPriceSort, descendingPriceSort, getMaxCountSegmentsFlight, travelTimeSort} from "../utils";
import {SORT_TYPE} from "../const";

export const aLLFlights  = [...initialData.result.flights];

export const sortFlight = (flights, activeSort) => {
  const sortedFlights = [...flights]
  switch (activeSort) {
    case SORT_TYPE.ASCENDING_PRICE.value: {
      return sortedFlights.sort(ascendingPriceSort)
    }
    case SORT_TYPE.DESCENDING_PRICE.value: {
      return sortedFlights.sort(descendingPriceSort)
    }
    case SORT_TYPE.TRAVEL_TIME.value: {
      return sortedFlights.sort(travelTimeSort)
    }
    default: return sortedFlights
  }
}

export const filterFlights = ({selectedSegments, selectedAirlines, selectedMinPrice, selectedMaxPrice, activeSort}) => {
  const segmentsFilterExist = selectedSegments.length > 0;
  const airlineFilterExist = selectedAirlines.length > 0;
  const minPriceFilterExist = selectedMinPrice !== "";
  const maxPriceFilterExist = selectedMaxPrice !== "";

  const result = aLLFlights.filter(({flight}) => {
    const flightPriceAmount = Number(flight.price.passengerPrices[0].total.amount);

    let isValidFlight = true;

    if (airlineFilterExist) {
      isValidFlight = isValidFlight && selectedAirlines.includes(flight.carrier.uid);
    }

    if (minPriceFilterExist) {
      isValidFlight = isValidFlight && flightPriceAmount >= selectedMinPrice;
    }

    if (maxPriceFilterExist) {
      isValidFlight = isValidFlight && flightPriceAmount <= selectedMaxPrice;
    }

    if (segmentsFilterExist) {
      const maxSegments = getMaxCountSegmentsFlight(flight);

      isValidFlight = isValidFlight && selectedSegments.includes(maxSegments);
    }

    return isValidFlight;
  });

  return sortFlight(result, activeSort);

}

export const collectInitialFilters = (flights) => {
 return  flights.reduce(({segments, airlines}, {flight}) => {
    const currentSegments = getMaxCountSegmentsFlight(flight)
    const currentAirline = {caption: flight.carrier.caption, uid: flight.carrier.uid, minPrice: Number(flight.price.passengerPrices[0].total.amount) }
    const storedAirline = airlines.find(({uid}) => uid === currentAirline.uid);

    if (!segments.includes(currentSegments)) {
      segments.push(currentSegments)
    }

    if (!storedAirline) {
      airlines.push(currentAirline)
    } else if (currentAirline.minPrice < storedAirline.minPrice) {
      storedAirline.minPrice = currentAirline.minPrice
    }

    return {segments, airlines};
  }, { segments: [], airlines: [] })
}

export const collectActiveFiltersByAirlines = ({selectedSegments, selectedMinPrice, selectedMaxPrice}) => {
  const segmentsFilterExist = selectedSegments.length > 0;
  const minPriceFilterExist = selectedMinPrice !== "";
  const maxPriceFilterExist = selectedMaxPrice !== "";

    return aLLFlights.reduce((airlines, {flight}) => {
    const flightSegments = getMaxCountSegmentsFlight(flight);
    const currentAirline = flight.carrier.uid;
    const flightPriceAmount = Number(flight.price.passengerPrices[0].total.amount);
    const storedAirline =  airlines.find(({uid}) => uid === currentAirline);

    let isValidAirline = true;

    if (segmentsFilterExist) {
      isValidAirline = isValidAirline && selectedSegments.includes(flightSegments)
    }

    if (minPriceFilterExist && isValidAirline) {
      isValidAirline = flightPriceAmount >= Number(selectedMinPrice);
    }

    if (maxPriceFilterExist && isValidAirline) {
      isValidAirline = flightPriceAmount <= Number(selectedMaxPrice);
    }

    if (isValidAirline) {
     !storedAirline && airlines.push({uid: currentAirline, minPrice: flightPriceAmount})

     if (storedAirline && flightPriceAmount < storedAirline.minPrice) {
       storedAirline.minPrice = flightPriceAmount
     }
    }

    return airlines;
  }, [])
}

export const collectActiveFiltersBySegments = ({selectedAirlines, selectedMinPrice, selectedMaxPrice}) => {
  const airlineFilterExist = selectedAirlines.length > 0;
  const minPriceFilterExist = selectedMinPrice !== "";
  const maxPriceFilterExist = selectedMaxPrice !== "";

  return aLLFlights.reduce((segments, {flight}) => {
    const flightSegments = getMaxCountSegmentsFlight(flight);
    const flightAirline = flight.carrier.uid;
    const flightPriceAmount = Number(flight.price.passengerPrices[0].total.amount);
    const storedSegment =  segments.includes(flightSegments)

    let isValidSegment = true;

    if (airlineFilterExist) {
      isValidSegment = isValidSegment && selectedAirlines.includes(flightAirline)
    }

    if (minPriceFilterExist && isValidSegment) {
      isValidSegment = flightPriceAmount >= Number(selectedMinPrice);
    }

    if (maxPriceFilterExist && isValidSegment) {
      isValidSegment = flightPriceAmount <= Number(selectedMaxPrice);
    }

    if (isValidSegment) {
     !storedSegment && segments.push(flightSegments)
    }

    return segments;
  }, [])
}


export const collectActivePrice = (flights) => {
  const sortedFlightsByPrice = [...flights].sort(ascendingPriceSort);
  let minPrice = 0;
  let maxPrice = 0;

  if (sortedFlightsByPrice.length > 0) {
    minPrice = sortedFlightsByPrice[0].flight.price.passengerPrices[0].total.amount;
    maxPrice = sortedFlightsByPrice[sortedFlightsByPrice.length - 1].flight.price.passengerPrices[0].total.amount;
  }

  return {minPrice, maxPrice}
}
