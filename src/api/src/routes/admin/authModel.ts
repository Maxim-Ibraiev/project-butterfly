import axios from 'axios'
import { ILoginData } from '../../../../interfaces'

const URL = 'https://projectbf-29lq.onrender.com/admin/auth'

export const adminLogin = async (body: ILoginData) => axios.post(URL, body)
