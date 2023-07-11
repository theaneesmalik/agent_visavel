import { Button, Grid, Paper, Stack, Tabs, Typography, Box, Tab, Alert, Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
const Profile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  const id = localStorage.getItem('agentId')
  const { data, loading } = useFetch(`/users/${id}?role=agent`)
  const [value, setValue] = useState(0)
  useEffect(() => setProfile(data), [data])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // console.log(profile)
  return (
    <Paper sx={{ flexGrow: 1, p: 5 }}>
      {!profile.isCemplete && (
        <Alert severity='warning' sx={{ marginBottom: 3 }}>
          Incomplete Profile - Click Edit Profile Button to Complete your profile
        </Alert>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          {/* <img src='https://source.unsplash.com/200x200/?man-in-suit-profile' alt='Profile picture' /> */}
          <Avatar
            alt='Profile Picture'
            src={`${axios.defaults.baseURL}images/${profile.profile}`}
            sx={{ width: '15em', height: '15em', m: '0 auto' }}
          />
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item xs={12} md={8}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography
              gutterBottom
              variant='h3'
              color={'hsl(205.71deg 4.24% 32.35%)'}
            >{`${profile?.firstName} ${profile?.lastName}`}</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button onClick={() => navigate('/profile/edit', { state: profile })} variant='contained'>
                Edit Profile
              </Button>
            </div>
          </Stack>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Personal' />
              <Tab label='Professional' />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            username: &emsp; &emsp; {profile?.username}
            <br />
            email:&emsp; &emsp; &emsp; &emsp;{profile?.email}
            <br />
            phone:&emsp;&emsp; &emsp; &emsp;{profile?.phone}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Company: {profile?.company}
            <br />
            Licence: {profile?.licence}
            <br />
            Office Address: {`${profile?.address}, ${profile.city}, ${profile.province}, ${profile.country} `}
            <br />
          </CustomTabPanel>
        </Grid>
      </Grid>
    </Paper>
    // <Container component='main' maxWidth='xs'>
    //   <Stack>
    //     <img src='https://assets.leetcode.com/users/avatars/avatar_1678333936.png' alt='Profile picture' />
    //   </Stack>
    // </Container>
  )
}

export default Profile