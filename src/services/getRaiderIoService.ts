
async function getRaiderIoInfo(name: string): Promise<any>{
  try {
      const uri = 'https://raider.io/api/v1/characters/profile'
      const defaultParams = '?region=us&realm=azralon&name='
      const extraInfoParams = '&fields=raid_progression%2Cmythic_plus_scores_by_season%3Acurrent%2Cgear'

      const response = await fetch(`${uri}${defaultParams}${name}&${extraInfoParams}`)    
      
      if(!response) return
      
      const data = await response.json()      
      
      return data
      
    } catch (error) {
      console.log(error.message)
      return
    }
}

export { getRaiderIoInfo }