import * as React from 'react'
import Typography from '@mui/material/Typography'
import MyTextField from '../components/auth/MyTextField'
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
const gulfCountries = [
  { country: 'Bahrain', currency: 'BHD' },
  { country: 'Kuwait', currency: 'KWD' },
  { country: 'Oman', currency: 'OMR' },
  { country: 'Qatar', currency: 'QAR' },
  { country: 'Saudi Arabia', currency: 'SAR' },
  { country: 'United Arab Emirates', currency: 'AED' },
]
export default function NewJobDetail({ setCurrency }) {
  const [date, setDate] = React.useState(dayjs(new Date()))
  const [displayDate, setDisplayDate] = React.useState(date)
  const dateRef = React.useRef()
  React.useEffect(() => {
    setDisplayDate(dateRef.current.value)
  }, [date])
  return (
    <Stack gap={2}>
      <Typography variant='h4' color={'black'}>
        Job Detail
      </Typography>
      <MyTextField name='title' label='Tital' autoFocus={true} />
      <MyTextField name='minAge' label='Minimum Age for Range' type='Number' />
      <MyTextField name='maxAge' label='Maximum Age for Range' type='Number' />
      <MyTextField name='company' label='Company' />
      <MyTextField name='noOfJobs' label='No Of Jobs' />
      <MobileDatePicker
        label='Due Date'
        inputFormat='DD-MMM-YYYY'
        value={date}
        inputProps={{ name: 'deadline' }}
        inputRef={dateRef}
        onChange={(newDate) => setDate(newDate)}
        format='MMM DD, YYYY'
        renderInput={(params) => <TextField name='deadline' {...params} />}
      />
      <TextField sx={{ display: 'none' }} hidden={true} value={displayDate} name={'deadline'} />
      <Typography>Place of Duty</Typography>
      {/* <MyTextField name='country' label='Country' /> */}
      <FormControl>
        <InputLabel id='country'>Select Country</InputLabel>
        <Select
          name='country'
          labelId='country'
          label='Select Country'
          onChange={(e) => {
            const index = gulfCountries.findIndex((ctry) => ctry.country === e.target.value)
            setCurrency(gulfCountries[index].currency)
          }}
        >
          {gulfCountries.map((country) => (
            <MenuItem key={country.currency} value={country.country}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <MyTextField name='city' label='City' />
    </Stack>
  )
}
