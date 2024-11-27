import axios from "axios"
import { useToast } from 'vuestic-ui'
const { init } = useToast();

export const api = {
    post: (url: string, data: any, headers: { [key: string]: string } = { 'Content-Type': 'application/json' }) => {
        return new Promise((resolve, reject) => {
            axios.post(url, data, headers)
                .then((res) => {
                    if (0 === res.data.code)
                        return resolve(res.data.data)

                    init({ message: res.data.msg, color: 'danger' })
                    return reject(res.data.msg)
                })
                .catch((err) => {
                    init({ message: "系统内部错误，请联系系统管理员！", color: 'danger' })
                    return reject("系统内部错误，请联系系统管理员！")
                })
        })
    }
}
