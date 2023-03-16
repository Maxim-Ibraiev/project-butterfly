import axios from 'axios'
import { IAdmin, ILoginData, IResponse } from '../../../../interfaces'

const URL = 'https://projectbf-29lq.onrender.com/admin/auth'

export const adminLogin = async (body: ILoginData) => axios.post<IResponse<IAdmin>>(URL, body)
