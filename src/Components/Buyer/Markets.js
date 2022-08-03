import { Button } from "@mui/material";
import { getActiveMarkets } from "../../actions/properties";




const Markets = ({ marketList, markets, setMarkets, dispatch, navigate }) => {

  const handleMarket = async (market) => {
      dispatch(getActiveMarkets(market)).then(() =>
      navigate(`/dashboard/search?market=${market}`
      )
      )
  }

// const arrayMarkets = markets.filter((market) => market)
// console.log(arrayMarkets)
  return (
    marketList?.map((market) => 
        markets === market.market && market.market != null ? (
          <Button key={market._id} color='warning' variant='outlined' sx={{ borderRadius: '2em', backgroundColor: 'white', "&:hover": { transform: 'scale(1.1)' }, whiteSpace: 'nowrap', width: { xs: '100%', sm: '15%', lg: '15%', xl: '10%' }, mr: { xs: 2, sm: 5 }, px: { xs: 10, sm: 5 }, alignItems: 'center'}}>
              {market.market}
          </Button>
        ) :
        <Button key={market._id} onClick={async () => {setMarkets(market.market); handleMarket(market.market)}} variant='outlined' sx={{ borderRadius: '2em', backgroundColor: 'white', "&:hover": { transform: 'scale(1.1)' }, whiteSpace: 'nowrap', width: 'auto', mr: { xs: 2, sm: 5 }, my: { xs: 1, sm: 0 }, width: { xs: '100%', sm: '15%', lg: '15%', xl: '10%' }, px: { xs: 10, sm: 5 }, alignItems: 'center', }}>
        {market.market}
        </Button>
      ) 
  )
}

export default Markets

// const arrayMarkets = markets.filter((market) => market)
// console.log(arrayMarkets)
//   return (
//     marketList?.map((market) => 
//         arrayMarkets.includes(market.market) ? (
//           <Button key={market._id} color='warning' onClick={() => { var index = arrayMarkets.splice(market.market, 1); setMarkets(arrayMarkets.splice(index, 1)) }}  variant='outlined' sx={{ borderRadius: '2em', backgroundColor: 'white', "&:hover": { transform: 'scale(1.1)' }, whiteSpace: 'nowrap', width: 'auto', mr: { xs: 2, sm: 5 }, px: { xs: 10, sm: 5 }, alignItems: 'center', }}>
//               {market.market}
//           </Button>
//         ) :
//         <Button key={market._id} onClick={() => {setMarkets(array => [...array, market.market])}} variant='outlined' sx={{ borderRadius: '2em', backgroundColor: 'white', "&:hover": { transform: 'scale(1.1)' }, whiteSpace: 'nowrap', width: 'auto', mr: { xs: 2, sm: 5 }, px: { xs: 10, sm: 5 }, alignItems: 'center', }}>
//         {market.market}
//         </Button>
//       ) 
//   )

// const markets = [
//     {
//         market: 'Orlando, FL',
//     },
//     {
//         market: 'Tampa, FL',
//     },
//     {
//         market: 'Newark, NJ',
//     },
//     {
//         market: 'Orlando, FL',
//     },
//     {
//         market: 'Salt Lake City, UT',
//     },
//     {
//         market: 'Charlotte, NC',
//     },
//     {
//         market: 'Columbus, OH',
//     },
//     {
//         market: 'Kansas City, MO',
//     },
//     {
//         market: 'St. Louis, MO',
//     },
//     {
//         market: 'Austin, TX',
//     },
//     {
//         market: 'San Antonio, TX',
//     },
//     {
//         market: 'Dallas, TX',
//     },
//     {
//         market: 'Houston, TX',
//     },
//     {
//         market: 'Atlanta, GA',
//     },
//     {
//         market: 'Tucson, AZ',
//     },
//     {
//         market: 'Northern Arizona',
//     },
//     {
//         market: 'Las Vegas, NV',
//     },
//     {
//         market: 'Indianapolis, IN',
//     },
//     {
//         market: 'Birmingham, AL',
//     },
// ]