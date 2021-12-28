import moment from 'moment'
import Crypto from 'crypto-js'

const decrypt = (token: string) => {
    try {
        const decrypted: string = Crypto.enc.Utf8.stringify(Crypto.enc.Base64.parse(token))
        const values = decrypted.split(/#(.+)/)

        if (values.length >= 2) {
            return {
                datetime: moment(values[0]),
                description: values[1],
                token
            }
        }
        return null
    } catch (error) {
        return null
    }
}

export {
    decrypt
}