import { useState, ChangeEvent } from "react"
import useLoader from "./useLoader"

export default function useForm(initialState: any){
  const [state, setState] = useState(initialState)
  const [formStep, setFormStep] = useState(1)

  const { setIsLoading } = useLoader(true)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setState({
      ...state,
      [name]: value
    })
  }

  const handleFormNextStep = () => {       
    const nextStep = () =>  formStep < state.formSteps && setFormStep(formStep => formStep + 1)      
    setTimeout(nextStep, 500)    
  }

  const handleFormPreviousStep = () => {        
    const prevStep = () => formStep > 0 && setFormStep(formStep => formStep - 1)      
    setTimeout(prevStep, 500) 
  }

  return {
    state,
    setState,
    handleChange,
    formStep,
    setFormStep,
    handleFormPreviousStep,
    handleFormNextStep,    
  }
}