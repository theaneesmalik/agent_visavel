import MyTextField from '../components/auth/MyTextField'
import { Button, Stack, Typography } from '@mui/material'
import MyCheckbox from '../components/MyCheckbox'
const fields = ['accommodation', 'food', 'ticket', 'medical', 'insurance', 'transpotation']
export default function NewJobBenifits({ currency }) {
  return (
    <Stack gap={2}>
      <Typography variant='h4' color={'black'}>
        Job Benifits
      </Typography>
      <MyTextField
        name='currency'
        label='Salary Currency'
        value={currency}
        InputLabelProps={{ shrink: !!currency }}
      />
      <MyTextField name='minSalary' label='Minimum Salary for Range' type='Number' />
      <MyTextField name='maxSalary' label='Maximum Salary for Range' type='Number' />
      {fields.map((field) => (
        <MyCheckbox key={field} name={field} />
      ))}
      <Button type='submit' variant='contained' color='success'>
        Submit
      </Button>
    </Stack>
  )
}
