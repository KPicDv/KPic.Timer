/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import Crypto from 'crypto-js'
import frLocale from 'date-fns/locale/fr'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Form from '../Form/Form'
import Timer from '../Timer/Timer'
import './App.css'
import moment from 'moment'

function App() {
    const token = document.location.pathname.replace(/^\//, '')
    let datetime: moment.Moment | null = null
    let description: string | null = null

    if (token) {
        try {
            const decrypted: string = Crypto.enc.Utf8.stringify(Crypto.enc.Base64.parse(token))
            const values = decrypted.split(/#(.+)/)

            if (values.length >= 2) {
                datetime = moment(values[0])
                description = values[1]
            }
        } catch (error) {
            document.location = '/'
        }
    }

    const component = datetime && description ? <Timer datetime={datetime} description={description}/> : <Form/>
    
    const theme = React.useMemo(
        () => createTheme({
            palette: {
                mode: 'dark'
            }
        }),
        [false],
    )

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider locale={frLocale} dateAdapter={AdapterDateFns}>
                <div className="app">
                    {component}
                </div>
            </LocalizationProvider>
        </ThemeProvider >
    )
}

export default App
