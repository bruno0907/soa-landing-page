import React, { useState, useEffect, useCallback, FormEvent } from 'react'

import { GoCheck, GoX, GoAlert } from 'react-icons/go'

import Input from '../Input'
import Select from '../Select'
import Textarea from '../Textarea'
import Button from '../Button'

import Loader from 'react-loader-spinner'

import { Container, 
  Form, 
  FormSection,   
  FormFallback, 
} from './styles'
import api from '../../services/api'

interface ClassesProps{  
  _id: string;
  className: string;
  specializations: Array<[]>    
}

export default function ApplyForm(){    
  const [battleTag, setBattleTag] = useState('')
  const [charName, setCharName] = useState('')
  const [className, setClassName] = useState('')
  const [mainSpec, setMainSpec] = useState('')
  const [offSpec, setOffSpec] = useState('')
  const [about, setAbout] = useState('')  
  
  const [classesList, setClassesList] = useState<ClassesProps[]>([])
  const [classSpecs, setClassSpecs] = useState<Array<unknown>>([])   

  const [applyStatus, setApplyStatus] = useState('PENDING')
  const [loading, setLoading] = useState(true)  

  useEffect(() => {        
    api.getClasses()
      .then(response => {
        if(!response) throw new Error('No response from the server.')
        const { classes } = response.data

        if(!classes) throw new Error('Error fetching classes')
                   
        setClassesList(classes)
        setLoading(false)
        return
      })
      .catch(error => {
        setApplyStatus('OUT-OF-SERVICE')
        setLoading(false)
        return
      })

  }, [])
  
  const fetchClassSpecs = useCallback((classChosen) => {       
    const selectedClass = classesList.filter(option => option.className === classChosen)
    setClassSpecs(selectedClass[0].specializations)
    
  }, [classesList])
  
  const handleClassChange = (value: string) => {         
    setClassName('')
    setMainSpec('')
    setOffSpec('')
    setClassName(value)       
    fetchClassSpecs(value)         
  }
  
  const validateSubmit = !Boolean(
    battleTag.length > 0 &&
    charName.length > 0 && 
    className.length > 0 && 
    mainSpec.length > 0
  ) 

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    
    setLoading(true)

    const data = {
      battleTag,
      charName,
      className,
      mainSpec,
      offSpec,
      about
    }

    try {      
      const response = await api.newApply(data)          
      if(!response){
        throw new Error('Um erro ocorreu ao concluir seu apply.')
      }      
      setApplyStatus('SUCCESS')
      setLoading(false)      
      return  

    } catch (error) {
      setApplyStatus('ERROR')      
      setLoading(false)
      return

    }    
  }

  return(
    <Container>
      <Form onSubmit={handleSubmit}> 
        { loading ? 
          <Loader
            type="ThreeDots"
            color="#009ae4"
            height={100}
            width={100}      
          />    
        : 
          <>
          { applyStatus === 'PENDING' && 
            <>
              <h2>Formulário de Apply</h2>
              <FormSection>
                <Input 
                  label="Battle Tag"
                  name="battleTag"          
                  value={battleTag}
                  onChange={event => setBattleTag(event.target.value)}
                />
                <Input 
                  label="Nome do Personagem"
                  name="charName"          
                  value={charName}
                  onChange={event => setCharName(event.target.value)}
                />        
              </FormSection>
              <FormSection>
                <Select 
                  label="Classe"
                  name="class"
                  value={className}                  
                >                  
                  { classesList.map(gameClass => 
                    <li 
                      key={gameClass._id} 
                      onClick={() => handleClassChange(gameClass.className)}
                      >{gameClass.className}
                    </li>
                  )}   
                </Select>
                { className.length <= 0 ? null :      
                  <Select 
                    label="Main Spec"
                    name="mainSpec"
                    value={mainSpec}
                    onChange={event => setMainSpec(event.target.value)}                                
                  >                    
                    { classSpecs.map((spec: any) => 
                      <li key={spec} onClick={() => setMainSpec(spec)}>{spec}</li>
                    )}
                  </Select>  
                }
                { mainSpec.length <= 0 ? null :      
                <Select 
                  label="Off Spec"
                  name="offSpec"
                  value={offSpec}
                  onChange={event => setOffSpec(event.target.value)}                                  
                >                  
                  { classSpecs.map((spec: any) => 
                    <li key={spec} onClick={() => setOffSpec(spec)}>{spec}</li>
                  )}
                </Select> 
                }
              </FormSection>
              <FormSection>
                <Textarea
                  label="Informações adicionais"
                  name="about"          
                  value={about}
                  onChange={event => setAbout(event.target.value)}
                />
              </FormSection>
              <FormSection>
                <Button type="submit" disabled={validateSubmit}>Enviar</Button>
              </FormSection>
            </>
          }    

          { applyStatus === 'SUCCESS' &&
            <FormFallback>
              <GoCheck size={180} color="#00ff04" />
              <h3>Apply realizado com sucesso!</h3>
              <p>Agora basta aguardar nosso contato.</p>
            </FormFallback> 
          }
          { applyStatus === 'ERROR' &&
            <FormFallback>
              <GoX size={180} color="#822121" />
              <h3>Houve um erro ao enviar seu apply!</h3>
              <a href="https://discord.gg/9Be497S" target="_blank" rel="noopener noreferrer">Por favor contate a equipe.</a>
            </FormFallback>
          }        
          { applyStatus === 'OUT-OF-SERVICE' &&
            <FormFallback>
              <GoAlert size={140} color="#ffff00"/>
              <h3>Serviço indisponível no momento! Tente novamente mais tarde</h3>            
              <a href="https://discord.gg/9Be497S" target="_blank" rel="noopener noreferrer">Por favor contate a equipe.</a>
            </FormFallback>
          } 
          </>
        }
      </Form>
    </Container>    
  )
  
}
