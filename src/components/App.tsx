import React, { useState } from 'react'
import moment from 'moment';
import './App.css';

function App() {
    const dateString = moment().add(2 * 24 * 60 * 60, 'seconds').format('YYYY-MM-DD HH:mm:ss')
    const description = 'LE SKI !'
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const formate = (value: number) => value.toString().padStart(2, '0')

    React.useEffect(() => {
        if (moment(dateString).isAfter(moment())) {
            const interval = setInterval(() => {
                const date = moment(dateString)
                const now = moment()
                const d = date.diff(now, 'days')
                const h = date.subtract(d, 'days').diff(now, 'hours')
                const m = date.subtract(h, 'hours').diff(now, 'minutes')
                const s = date.subtract(m, 'minutes').diff(now, 'seconds')
                
                if (s >= 0) {
                    setDays(d)
                    setHours(h)
                    setMinutes(m)
                    setSeconds(s)
                } else {
                    clearInterval(interval)
                }
            }, 1);
        }
    }, []);

    return (
        <div className="app">
            <h1>{description}</h1>
            <div>
                <div className="digits">
                    <div className="value">{formate(days)}</div>
                    <div className="legend">jour{days > 1 ? 's' : ''}</div>
                </div>
                <span className="symbol">:</span>
                <div className="digits">
                    <div className="value">{formate(hours)}</div>
                    <div className="legend">heure{hours > 1 ? 's' : ''}</div>
                </div>
                <span className="symbol">:</span>
                <div className="digits">
                    <div className="value">{formate(minutes)}</div>
                    <div className="legend">minute{minutes > 1 ? 's' : ''}</div>
                </div>
                <span className="symbol">:</span>
                <div className="digits">
                    <div className="value">{formate(seconds)}</div>
                    <div className="legend">seconde{seconds > 1 ? 's' : ''}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
