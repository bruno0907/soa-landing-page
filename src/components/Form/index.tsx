import { useState, useEffect, useCallback, FormEvent, ChangeEvent } from 'react'
import useSWR from 'swr'

import { GoCheck, GoX, GoAlert } from 'react-icons/go'

import Input from '../Input'
import Select from '../Select'
import Textarea from '../Textarea'
import Button from '../Button'

import Loader from 'react-loader-spinner'

import { 
  Form, 
  FormSection,   
  FormFallback, 
} from './styles'
import axios from 'axios'

interface ClassesProps{   
  _id: string;
  className: string;
  specializations: string[];  
}

const applyFormState = {
  pending: 'OK',
  success: 'SUCCESS',
  error: 'ERROR',
  maintenance: 'MAINTENANCE'
}

const initialData = {
  battleTag: '',
  charName: '', 
  className: '',
  mainSpec: '',
  offSpec: '',
  about: '',  
}

export default function ApplyForm(){   
  const { error, data } = useSWR('/api/classes')
  
  const [classes, setClasses] = useState<ClassesProps[]>([])
  const [classSpecs, setClassSpecs] = useState<unknown[]>([])   
  const [applyFormStatus, setApplyFormStatus] = useState(applyFormState.pending)
  const [formStep, setFormStep] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const [state, setState] = useState(initialData)

  useEffect(() => {
    if(error) setApplyFormStatus(applyFormState.maintenance)
    if(!data) setLoading(true)

    setClasses(data)
    setLoading(false)

    console.log(data)

  }, [error, data])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target
    const { name } = event.target

    setState({
      ...state,
      [name]: value
    })

  }
  
  const handleClassChange = (value: string) => {   
    setState({
      ...state,
      className: value,
      mainSpec: '',
      offSpec: ''
    })
       
    fetchClassSpecs(value)         
  }  
  
  const fetchClassSpecs = useCallback((classChosen) => {       
    const selectedClass = classes.filter(option => option.className === classChosen)
    setClassSpecs(selectedClass[0].specializations)
    
  }, [classes])  

  const validateSubmit = !Boolean(
    state.battleTag.length > 0 &&
    state.charName.length > 0 && 
    state.className.length > 0 && 
    state.mainSpec.length > 0
  ) 

  const initialFormStep = 0
  const finalFormStep = 4
  const formTimeout = 500

  const handleFormNextStep = () => {    
    setLoading(true)
    setTimeout(() => {
      formStep < finalFormStep && setFormStep(formStep => formStep + 1)
      setLoading(false)
    }, formTimeout)    
  }


  const handleFormPreviousStep = () => {    
    setLoading(true)
    setTimeout(() => {
      formStep > initialFormStep && setFormStep(formStep => formStep - 1)      
      setLoading(false)
    }, formTimeout) 
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    
    setLoading(true)

    const data = {
      battleTag: state.battleTag,
      charName: state.charName,
      className: state.className,
      mainSpec: state.mainSpec,
      offSpec: state.offSpec,
      about: state.about
    }

    await axios.post('/api/apply', data)
      .then(() => {
        setApplyFormStatus(applyFormState.success)
        setLoading(false)
      })
      .catch(() => {
        setApplyFormStatus(applyFormState.error)
        setLoading(false)
      })    
  }

  const handleFormReset = (event: FormEvent) => {
    event.preventDefault()
    
    setFormStep(initialFormStep)
    setApplyFormStatus(applyFormState.pending)
  }

  return(  
    <Form 
      onSubmit={handleSubmit} 
      onKeyPress={event => event.key === 'Enter' && event.preventDefault()}
    > 
      { loading 
        ? <Loader type="ThreeDots" color="#009ae4" height={100} width={100}  />  
        : <> { applyFormStatus === 'OK' && (
          <>
            <h2>Formulário de Apply</h2>
            { formStep === 0 &&     
                <FormSection>
                  <h3>Battle Tag</h3>
                  <p>Por favor nos informe a sua battle tag. Será por ela que faremos contato contigo.</p>
                  <Input 
                    label="Battle Tag (Exemplo: shake#1455)"
                    name="battleTag"          
                    value={state.battleTag}
                    onChange={handleChange}
                  />
                  <Button 
                    type="button" 
                    onClick={handleFormNextStep} 
                    disabled={!Boolean(state.battleTag !== '')}
                  >Próximo</Button>
                </FormSection>
            } 

            { formStep === 1 &&            
              <FormSection>
                <h3>Nome do personagem</h3>
                <p>Informe apenas o nome do seu personagem. Não há necessidade de informar o servidor.</p>
                <Input 
                  label="Nome do Personagem"
                  name="charName"          
                  value={state.charName.replace(/[-#\d]/, '')}
                  onChange={handleChange}                
                />  
                <Button 
                    type="button" 
                    onClick={handleFormNextStep} 
                    disabled={!Boolean(state.charName !== '')}
                  >Próximo</Button>
                <span onClick={handleFormPreviousStep}>Voltar</span>   
              </FormSection>            
            }

            { formStep === 2 &&
              <FormSection>
                <h3>Classe, spec e off-spec</h3>
                <p>Escolha a sua classe, spec e se possuir uma off-spec</p>
                <Select 
                  label="Classe"
                  name="class"
                  value={state.className}                  
                  >                  
                  { classes.map(gameClass => 
                    <li 
                    key={gameClass._id} 
                    onClick={() => handleClassChange(gameClass.className)}
                    >
                      {gameClass.className}
                    </li>
                  )}   
                </Select>
                { state.className.length <= 0 ? null :      
                  <Select 
                    label="Main Spec"
                    name="mainSpec"
                    value={state.mainSpec}
                    onChange={handleChange}                                
                    >                    
                    { classSpecs.map((spec: any) => 
                      <li 
                      key={spec} 
                      onClick={() => setState({...state, mainSpec: spec})}
                      >{spec}</li>
                      )}
                  </Select>  
                }
                { state.mainSpec.length <= 0 ? null :      
                <Select 
                label="Off Spec"
                name="offSpec"
                value={state.offSpec}
                onChange={handleChange}                                  
                >                  
                  { classSpecs.map((spec: any) => 
                    <li 
                    key={spec} 
                      onClick={() => setState({...state, offSpec: spec})}
                    >{spec}</li>
                    )}
                </Select> 
                }
                <Button 
                    type="button" 
                    onClick={handleFormNextStep} 
                    disabled={!Boolean(state.className !== '' && state.mainSpec !== '')}
                  >Próximo</Button>
                <span onClick={handleFormPreviousStep}>Voltar</span>
              </FormSection>
            }

            { formStep === 3 &&
              <FormSection>
                <h3>Informações adicionais</h3>
                <p>Use este espaço para nos informar sobre você queira. Logs, armory ou Raider.io não são precisos.</p>
                <Textarea
                  label="Informações adicionais"
                  name="about"          
                  value={state.about}
                  onChange={handleChange}
                  />
                <Button type="button" onClick={handleFormNextStep} >Próximo</Button>              
                <span onClick={handleFormPreviousStep}>Voltar</span>
              </FormSection>
            }

            { formStep === 4 &&
              <FormSection>
                <h3>Revise suas informações</h3>
                <p>Confira se os dados informados estão corretos antes de enviar o seu apply.</p>
                
                <Input label="Battle Tag" name="" value={state.battleTag} disabled/>
                <Input label="Personagem" name="" value={state.charName} disabled/>
                <Input label="Classe" name="" value={state.className} disabled/>
                <Input label="Main Spec" name="" value={state.mainSpec} disabled/>
                {state.offSpec !== '' &&
                  <Input label="Off Spec" name="" value={state.offSpec} disabled/>
                }
                {state.about !== '' &&
                  <Textarea label="Informações adicionais" name="" value={state.about} disabled/>
                }                
                <Button type="submit" disabled={validateSubmit}>Enviar</Button>    
                <span onClick={handleFormPreviousStep}>Voltar</span>                      
              </FormSection>
            }          
          </>
        )}
        
        { applyFormStatus === 'SUCCESS' &&
          <FormFallback>
            <GoCheck size={140} color="#00ff04" />
            <h3>Apply realizado com sucesso!</h3>
            <p>Agora basta aguardar nosso contato. Em caso de dúvidas, contate-nos via discord.</p>            
            <a href="https://discord.gg/9Be497S" target="_blank" rel="noopener noreferrer">
              <img src="/images/discord_logo.svg" alt="Discord" />         
            </a>   
          </FormFallback> 
        }

        { applyFormStatus === 'ERROR' &&
          <FormFallback>
            <GoX size={140} color="#822121" />
            <h3>Houve um erro ao enviar seu apply!</h3>
            <p>Acesse nosso discord e fale diretamente conosco ou tente novamente.</p>
            <a href="https://discord.gg/9Be497S" target="_blank" rel="noopener noreferrer">
              <img src="/images/discord_logo.svg" alt="Discord" />         
            </a>   
            <Button onClick={handleFormReset}>Tentar novamente</Button>
          </FormFallback>
        }  

        { applyFormStatus === 'MAINTENANCE' &&
          <FormFallback>
            <GoAlert size={140} color="#ffff00"/>
            <h3>Serviço indisponível!</h3>   
            <p>Acesse nosso discord e fale diretamente conosco.</p>
            <a href="https://discord.gg/9Be497S" target="_blank" rel="noopener noreferrer">
              <img src="/images/discord_logo.svg" alt="Discord" />         
            </a>            
          </FormFallback>
        }

      </>
      }
    </Form>      
  )  
}
