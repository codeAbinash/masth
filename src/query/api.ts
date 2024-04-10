import { secureLs } from '@utils/storage'
import axios from 'axios'
import { Alert } from 'react-native'

const API = 'https://masth.nexgino.com/api/'

axios.defaults.headers.common.secret = 'hellothisisocdexindia'

export function setAuthToken() {
  const token = secureLs.getString('token')
  if (token) axios.defaults.headers.common.Authorization = 'Bearer ' + token
}

const DEFAULT_ERR = 'Error occurred. Pease check your internet connection and try again'

interface ServerResponse {
  message: string
  status: boolean
}

async function postApi<T>(url: string, data: any) {
  try {
    if (data) return (await axios.post<T>(API + url, data)).data
    else return (await axios.post<T>(API + url)).data
  } catch (error: any) {
    console.log(JSON.stringify(error.response.data, null, 2))
    const errors = error?.response.data.errors
    const singleError = errors[Object.keys(errors)[0]][0]
    if (error?.response?.status === 401 || error?.response.data.message === 'Unauthenticated.') throw new Error('Unauthenticated')
    throw new Error(singleError || DEFAULT_ERR)
  }
}

export function showErr(error: Error) {
  console.log(JSON.stringify(error, null, 2))
  Alert.alert(error.name, error.message)
}

export async function loginApi_f({ phone, country_code }: { phone: string; country_code: string }) {
  return await postApi<ServerResponse>('auth/login/LoginOTP', { phone, country_code })
}

// All functions below are for fetching data from the server and there are types for the data that is fetched

type SignUpAPI = {
  username: string
  dob: string
  lang: string
  name: string
  country_code: string
  phone: string
}
export async function signUpApi_f(data: SignUpAPI) {
  return await postApi<ServerResponse>('auth/SignUp/SendOTP', data)
}

type VerifySignUpAPI = {
  country_code: string
  phone: string
  otp: string
}

interface ResponseWithToken extends ServerResponse {
  token: string
}
export async function verifySignUp_f(data: VerifySignUpAPI) {
  return await postApi<ResponseWithToken>('auth/SignUp', data)
}

type VerifyLoginAPI = {
  country_code: string
  phone: string
  otp: string
}
export async function verifyLogin_f(data: VerifyLoginAPI) {
  return await postApi<ResponseWithToken>('auth/login', data)
}

export interface ProfileT {
  data: ProfileDataT
  message: string
  refer_claimed: boolean
  status: boolean
}

export interface ProfileDataT {
  refer_code: string
  country_code: string
  created_at: string
  date_of_birth: string
  email: string
  email_verified_at: null
  id: number
  language: string
  name: string
  phone_number: string
  profile_pic: string | null
  updated_at: string
  username: string
}
export async function profile_f() {
  console.log('Fetch Profile Data')
  return await postApi<ProfileT>('profile/GetUser', null)
}

export async function updateProfile_f(data: FormData) {
  return await axios.post<ServerResponse>(API + 'profile/UpdateUser', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function claim_refer_f({ refer_code }: { refer_code: string }) {
  return await postApi<ServerResponse>('refer/claim', { refer_code })
}

export async function skip_refer_f() {
  return await postApi<ServerResponse>('refer/skip', null)
}

export interface ReferredUserT {
  status: boolean
  referred_bonus: string
  coins_earned: number
  list: List
}

export interface List {
  current_page: number
  data: Datum[]
  next_page_url: null
}

export interface Datum {
  user_id: string
  coins_earn: string
  profile: Profile[]
}

export interface Profile {
  id: number
  name: string
  profile_pic: string
  username: string
}

export async function get_referred_members_f() {
  return await postApi<ReferredUserT>('refer/get_referred_members', null)
}

export interface MiningStatusT {
  status: boolean
  message: string
  is_mining: boolean
}
export async function check_mining_status_f() {
  return await postApi<MiningStatusT>('mining/checkMiningStatus', null)
}
