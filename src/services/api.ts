import axios from 'axios'

const soaApi = 'https://soa-apply-backend.herokuapp.com'

const api = axios.create({ baseURL: soaApi })

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
  async getClasses(){
    return await api.get('/classes')
  }

  async getApplies(params?: string){
    if(!params){
      return await api.get(`/applies`)
    }
    return await api.get(`/applies${params}`)
  }

  async getApply(id: string){
    return await api.get(`/apply/${id}`)
  }

  async newApply(data: ApplyProps){
    return await api.post('/applies', data)
  }

  async applyStatusHandle(id: string, status: string){
    return await api.post(`/apply/${id}`, {
      approvalStatus: status
    })
  }

  async applyRemove(id: string){
    return await api.delete(`/apply/${id}`)
  }

  async getRaiderioInfo(name: string){
    const defaultParams = '?region=us&realm=azralon&name='
    const extraInfoParams = '&fields=raid_progression%2Cmythic_plus_scores_by_season%3Acurrent%2Cgear'
    return await rioApi.get(`${defaultParams}${name}&${extraInfoParams}`)
  }

  async adminAuth(data: AdminAuthProps){
    return await api.post('/admin/sign-in', data)
  }
  
}

export default new Api()
