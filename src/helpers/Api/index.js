import axios from 'axios'

export const fetchArrivals = async (airport, begin, end) => {
  console.log('fetchArrivals')
  let response = await axios.get(`https://opensky-network.org/api/flights/arrival?airport=${airport}&begin=${begin}&end=${end}`)
  console.log('fetchArrivals response', response)
  return response.data
}

export const fetchDepartures = async (airport, begin, end) => {
  console.log('fetchDepartures')
  let response = await axios.get(`https://opensky-network.org/api/flights/departure?airport=${airport}&begin=${begin}&end=${end}`)
  console.log('fetchDepartures response', response)
  return response.data
}
