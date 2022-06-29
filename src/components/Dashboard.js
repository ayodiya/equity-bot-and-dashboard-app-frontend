import moment from 'moment'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'

import CardComponent from './Card'

const Dashboard = () => {
  const [marketData, setMarketData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getMarketData = () => {
    setLoading(true)
      fetch('https://equity-bot-and-app-backend.herokuapp.com/api/marketData').then((response) => response.json())
      .then((data) => {
        const {newMarketData} = data
         setMarketData(newMarketData)
         setLoading(false)
      }).catch(error => setError(true) )
  }


  console.log(marketData)


useEffect(() => getMarketData(), [])

  useEffect(() => {
const interval = setInterval(() => getMarketData(), 300000)
    return () => clearInterval(interval);
  }, [])


  if(marketData === undefined || loading){
    <CircularProgress 
    sx={{position: 'fixed',
    top: '50%',
    left: '50%'}} color="success" />
  }

  if(error){
    <Box sx={{position: 'fixed',
    top: '50%',
    left: '50%'}}>Server error, please try again</Box>
  }

  return (
    <Box sx={{ backgroundColor: 'grey', minHeight: '100vh' }}>
       <Stack
        direction={{ xs: 'column', md: 'row' }} justifyContent='center'
        alignItems='center' spacing={2}
        sx={{ paddingTop: '100px' }}
      >
        <Box>Account Name: {marketData?.accountName}</Box>
        <Box>Broker: {marketData?.broker}</Box>
        <Box>Platform: {marketData?.platform}</Box>
        <Box>Server: {marketData?.server}</Box>
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }} justifyContent='center'
        alignItems='center' spacing={2}
        sx={{ paddingTop: '100px' }}
      >
        <CardComponent title='Time' icon={<AccessTimeFilledIcon />}  content={   marketData?.serverTime?.time === undefined ? <CircularProgress color="success" /> : moment(marketData?.serverTime?.time).format('MMMM Do YYYY, h:mm:ss a')} />
        <CardComponent title='Market Time' icon={<AccessTimeFilledIcon />} content={ 
          marketData?.serverTime?.brokerTime === undefined ? <CircularProgress color="success" />:
          moment(marketData?.serverTime?.brokerTime).format('MMMM Do YYYY, h:mm:ss a')} />
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }} justifyContent='center'
        alignItems='center' spacing={2}
        sx={{ paddingTop: '50px', paddingBottom: '50px' }}
      >
        <CardComponent title='Equity' icon={<EqualizerIcon />} content={ marketData.equity === undefined ? <CircularProgress color="success" /> :`₦ ${marketData?.equity}`} />
        <CardComponent title='Account Balance' icon={<AccountBalanceWalletIcon />} content={ marketData.balance === undefined ? <CircularProgress color="success" /> : `₦ ${marketData?.balance}`} />
      </Stack>
    </Box>
  )
}

export default Dashboard
