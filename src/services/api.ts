import axios from 'axios'

const api = axios.create({
  baseURL: 'https://soa-apply-backend.herokuapp.com'
})

const rioApi = axios.create({
  baseURL : 'https://raider.io/api/v1/characters/profile'
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
