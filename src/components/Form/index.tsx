import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react'

import { Link } from 'react-router-dom'

import { GoCheck, GoX } from 'react-icons/go'

import Input from '../Input'
import Select from '../Select'
import Textarea from '../Textarea'

import PageLoader from '../Loader'

import { Container, Form, FormSection, FormButton, FormSuccess, FormError } from './styles'
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
  const [loading, setLoading] = useState(false)  

  useEffect(() => {    
    api.getClasses()
      .then(response => {
        if(!response) throw new Error('No response from the server.')

        const { classes } = response.data

        if(!classes) throw new Error('Error fetching classes')
                   
        return setClassesList(classes)
      })
      .catch(error => console.error(error.message))
  }, [])

  
  const fetchClassSpecs = useCallback((classChosen) => {       
    const selectedClass = classesList.filter(option => option.className === classChosen)
    setClassSpecs(selectedClass[0].specializations)
    
  }, [classesList])
  
  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>): void => {   
    setClassName('')
    setMainSpec('')
    setOffSpec('')
    setClassName(event.target.value)              
    fetchClassSpecs(event.target.value)     
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
      { loading === false ?
      <Form onSubmit={handleSubmit}> 
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
                onChange={event => handleClassChange(event)}
              >
                <option hidden />                
                { classesList.map(gameClass => 
                  <option key={gameClass._id} value={gameClass.className}>{gameClass.className}</option>
                )}   
              </Select>
              { className.length <= 0 ?
                null :
              <>              
              <Select 
                label="Main Spec"
                name="mainSpec"
                value={mainSpec}
                onChange={event => setMainSpec(event.target.value)}                                
              >
                <option hidden />
                { classSpecs.map((spec: any) => 
                  <option key={spec} value={spec}>{spec}</option>
                )}
              </Select>        
              <Select 
                label="Off Spec"
                name="offSpec"
                value={offSpec}
                onChange={event => setOffSpec(event.target.value)}                                  
              >
                <option hidden />
                { classSpecs.map((spec: any) => 
                  <option key={spec} value={spec}>{spec}</option>
                )}
              </Select> 
              </>
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
              <FormButton type="submit" disabled={validateSubmit}>Enviar</FormButton>
            </FormSection>
          </>
        }    

        { applyStatus === 'SUCCESS' &&
          <FormSuccess>
            <GoCheck size={180} />
            <h1>Apply realizado com sucesso!</h1>
            <p>Agora basta aguardar nosso contato.</p>
          </FormSuccess> 
        }
        { applyStatus === 'ERROR' &&
          <FormError>
            <GoX size={180}/>
            <h1>Houve um erro ao enviar seu apply!</h1>
            <Link to="https://discord.gg/ucBZSUT2" target="_blank" rel="noopener noreferrer">Por favor contate a equipe.</Link>
          </FormError>
        }        
      </Form>
      : <PageLoader />
      }
    </Container>    
  )
  
}
