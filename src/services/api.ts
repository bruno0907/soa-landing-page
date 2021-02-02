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

interface AdminAuthProps{
  username: string;
  password: string;
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

  async adminAuth(data: AdminAuthProps){
    return await api.post('/admin/sign-in', data)
  }
}

export default new Api()
