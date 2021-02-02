import axios from 'axios'

const enviroment = process.env.REACT_APP_ENVIROMENT
const production = process.env.REACT_APP_PRODUCTION
const development = process.env.REACT_APP_DEVELOPMENT

const RIO = process.env.REACT_APP_RIO

const URI = enviroment === 'development' ? development : production

console.log(URI)
console.log(RIO)

const api = axios.create({
  baseURL: URI
})

const rioApi = axios.create({
  baseURL : RIO
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
    return await api.get('/applies')
  }

  async getClasses(){
    return await api.get('/classes')
  }

  async newApply(data: ApplyProps){
    return await api.post('/applies', data)
  }

  async rioInfoFetch(name: string){
    const defaultParams = '?region=us&realm=azralon&name='
    const extraInfoParams = '&fields=raid_progression%2Cmythic_plus_scores_by_season%3Acurrent%2Cgear'
    return await rioApi.get(`${defaultParams}${name}&${extraInfoParams}`)
  }
}

export default new Api()
