import { useState } from "react";

import Loader from '../components/Loader'

export default function useLoader(state: boolean){
  const [isLoading, setIsLoading] = useState(state)  

  return {
    isLoading,
    setIsLoading,
    Loader
  }
}
