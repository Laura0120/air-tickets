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
  const minPriceFilterExist = selectedMaxPrice !== "";
  const maxPriceFilterExist = selectedMaxPrice !== "";

   const result = aLLFlights.filter(({flight}) => {
     const flightAmount = Number(flight.price.passengerPrices[0].total.amount);

     let isValidFlight = true;

     if (airlineFilterExist) {
       isValidFlight = isValidFlight && selectedAirlines.includes(flight.carrier.uid);
     }

     if (minPriceFilterExist) {
       isValidFlight = isValidFlight && flightAmount >= selectedMinPrice;
     }

     if (maxPriceFilterExist) {
       isValidFlight = isValidFlight && flightAmount <= selectedMaxPrice;
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
    const storedAirlineIndex = airlines.findIndex(({uid}) => {
      return uid === currentAirline.uid
    })
   const storedAirlineElement = airlines[storedAirlineIndex];

    if (!segments.includes(currentSegments)) {
      segments.push(currentSegments)
    }

    if (storedAirlineIndex === -1) {
      airlines.push(currentAirline)
    } else if (currentAirline.minPrice < storedAirlineElement.minPrice) {
      storedAirlineElement.minPrice = currentAirline.minPrice
    }

    return {segments, airlines};
  }, { segments: [], airlines: [] })
}

export const collectActiveFiltersByAirlines = (segments) => {
  return aLLFlights.reduce((airlines, {flight}) => {
    const currentSegments = getMaxCountSegmentsFlight(flight);
    const currentAirline = {uid: flight.carrier.uid, minPrice: Number(flight.price.passengerPrices[0].total.amount) }
    const storedAirlineIndex = airlines.findIndex(({uid}) => {
      return uid === currentAirline.uid
    })
    const storedAirlineElement = airlines[storedAirlineIndex];

    if (segments.includes(currentSegments) && storedAirlineIndex === -1) {
      airlines.push(currentAirline)
    } else if (storedAirlineIndex !== -1 && currentAirline.minPrice < storedAirlineElement.minPrice) {
      storedAirlineElement.minPrice = currentAirline.minPrice
    }

    return airlines;
  }, [])
}

export const collectActiveFiltersBySegments = (airlines) => {
  return  aLLFlights.reduce((segments, {flight}) => {
    const currentSegments = getMaxCountSegmentsFlight(flight);
    const currentAirline = flight.carrier.uid;
    if (airlines.includes(currentAirline) && !segments.includes(currentSegments)) {
      segments.push(currentSegments)
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
