/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment'
import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import frLocale from 'date-fns/locale/fr'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Form from '../Form/Form'
import Timer from '../Timer/Timer'
import { decrypt } from '../../utils/token'
import { getCookie, setCookie, timerCookieName } from '../../utils/cookie'
import './App.css'

function App() {
    const token = document.location.pathname.replace(/^\//, '')
    let datetime: moment.Moment | null = null
    let description: string | null = null

    if (token) {
        const decrypted = decrypt(token)

        if (decrypted) {
            datetime = decrypted.datetime
            description = decrypted.description

            const tokens: Array<string> = getCookie(timerCookieName) || []
            if (!tokens.includes(token)) tokens.push(token)

            setCookie(timerCookieName, tokens)
        } else {
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
