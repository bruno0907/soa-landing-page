import Loader from 'react-loader-spinner'

export default function PageLoader(){
  return(  
    <Loader
      type="ThreeDots"
      color="#009ae4"
      height={100}
      width={100}      
    />
  )
}