import { useState, useEffect, useRef, MutableRefObject } from 'react'

export default function useVisible(initialState: boolean){
  const [isVisible, setIsVisible] = useState(initialState)
  const componentRef = useRef() as MutableRefObject<HTMLInputElement>

  const handleClickOutside = (event: { target: any }) => {
    if(componentRef.current && !componentRef.current.contains(event.target)){
      setIsVisible(false)
    }
  } 

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return{
    componentRef,
    isVisible,
    setIsVisible
  }

}