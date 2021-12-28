import moment from 'moment'
import * as React from 'react'
import Crypto from 'crypto-js'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { getCookie, timerCookieName } from '../../utils/cookie'
import './Form.css'
import { decrypt } from '../../utils/token'

function Form() {
    const [datetime, setDatetime] = React.useState<Date | null>(new Date())
    const [description, setDescription] = React.useState<string>('Test')
    const tokens: Array<string> = getCookie(timerCookieName) || []
    const timers: Array<{datetime: moment.Moment, description: string, token: string}> = tokens.map(token => decrypt(token)).filter(values => !!values) as any

    const create = () => {
        const encrypted = Crypto.enc.Base64.stringify(Crypto.enc.Utf8.parse(moment(datetime).format('YYYY-MM-DD HH:mm:ss') + '#' + description))
        document.location = '/' + encrypted
    }

    return (
        <div className="form">
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Grid sx={{ alignSelf: 'start'}} item xs={10} md={5} lg={4} xl={3}>
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
                <Grid sx={{ alignSelf: 'start'}} item xs={10} md={5} lg={4} xl={3}>
                    <Card>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14, textTransform: 'uppercase', textAlign: 'center' }}
                                color="text.secondary"
                                gutterBottom
                            >Mes timers</Typography>
                            <List>
                                {timers.map(timer =>
                                    <div>
                                        <Divider/>
                                        <ListItem disablePadding>
                                            <ListItemButton component="a" href={'/' + timer.token}>
                                                <ListItemText primary={timer?.description} secondary={timer?.datetime.format('DD/MM/YYYY HH:mm')}/>
                                            </ListItemButton>
                                        </ListItem>
                                    </div>
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Form
