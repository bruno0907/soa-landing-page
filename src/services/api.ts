import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_HOST
})

const rioApi = axios.create({
  baseURL : process.env.REACT_APP_RIO
})

interface ApplyProps{
  battleTag: string;
  charName: string;
  className: string;
  mainSpec: string;
  offSpec: string;
  about: string;
}

class Api{
  async getApplies(){
    return await api.get('/')
  }

  async getClasses(){
    return await api.get('/classes')
  }

  async newApply(data: ApplyProps){
    return await api.post('/', data)
  }

  async rioInfoFetch(name: string){
    return await rioApi.get(`?region=us&realm=azralon&name=${name}`)
  }
}

export default new Api()
