import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
const cTP = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const MyCheckbox = ({ name }) => {
  const [value, setValue] = useState(false)
  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={value} onChange={(e) => setValue(e.target.checked)} />}
        label={cTP(name)}
      />
      <TextField sx={{ display: 'none' }} hidden={true} value={value} name={name} />
    </>
  )
}

export default MyCheckbox
