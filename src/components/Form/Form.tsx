import moment from 'moment'
import * as React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Crypto from 'crypto-js'
import './Form.css'

function Form() {
    const [datetime, setDatetime] = React.useState<Date | null>(new Date())
    const [description, setDescription] = React.useState<string>('Test')

    const create = () => {
        const encrypted = Crypto.enc.Base64.stringify(Crypto.enc.Utf8.parse(moment(datetime).format('YYYY-MM-DD HH:mm:ss') + '#' + description))
        document.location = '/' + encrypted
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
                <Card>
                    <CardContent>
                        <Typography
                            sx={{ marginBottom: '20px', fontSize: 14, textTransform: 'uppercase', textAlign: 'center' }}
                            color="text.secondary"
                            gutterBottom
                        >Création d'un timer</Typography>
                        <TextField
                            sx={{ marginBottom: '30px' }}
                            fullWidth
                            autoFocus
                            label="Description"
                            value={description}
                            onChange={(newValue) => { setDescription(newValue.target.value) }}
                        />
                        <br />
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date / heure"
                            value={datetime}
                            onChange={(newValue) => { setDatetime(newValue) }}
                        />
                        <br />
                        <Button
                            sx={{ display: 'block', margin: 'auto', marginTop: '20px' }}
                            variant="contained"
                            disabled={!description.length || !moment(datetime).isValid()}
                            onClick={create}
                        >Valider !</Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Form
