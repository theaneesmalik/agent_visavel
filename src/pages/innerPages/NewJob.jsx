import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import NewJobDetail from '../../forms/NewJobDetail'
import NewJobBenifits from '../../forms/NewJobBenifits'
import axios from 'axios'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
function printForm(formData) {
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`)
  }
}
export default function BasicGrid() {
  const [currency, setCurrency] = React.useState()
  const navigate = useNavigate()
  const [error, setError] = React.useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    data.append('agentId', localStorage.getItem('agentId'))
    axios
      .post('/jobs', data, { headers: { Authorization: `Bearer ${localStorage.getItem('agentAuthToken')}` } })
      .then((res) => {
        if (res?.data) navigate('/jobs')
      })
      .catch((error) => {
        if (error.response.data.message) setError(error.response.data.message)
        console.log(error)
        const err = error.response?.data?.message === 'Invalid / Expired token'
        if (err) {
          navigate('/login')
          localStorage.clear()
        }
      })
  }
  return (
    <Box sx={{ flexGrow: 1, p: 1 }} component='form' onSubmit={handleSubmit}>
      <Typography variant='h3' align='center'>
        Add New Job
      </Typography>
      <Typography color={'red'}>{error}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item>
            <NewJobDetail setCurrency={setCurrency} />
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <NewJobBenifits currency={currency} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
