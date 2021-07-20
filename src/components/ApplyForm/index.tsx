import { useState, useEffect, useCallback, FormEvent } from 'react'

import { setCookie } from 'nookies'

import useLoader from '../../hooks/useLoader'
import useForm from '../../hooks/useForm'

import Input from '../Input'
import Select from '../Select'
import Textarea from '../Textarea'
import Button from '../Button'

import { GoCheck, GoX, GoAlert } from 'react-icons/go'

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
  pending: 'PENDING',
  success: 'SUCCESS',
  error: 'ERROR',
  maintenance: 'MAINTENANCE'
}

const initialFormData = {
  battleTag: '',
  charName: '', 
  className: '',
  mainSpec: '',
  offSpec: '',
  about: '',  
  formSteps: 5
}

export default function ApplyForm(){   
  const APPLY_URL = 'https://soa-apply-frontend.vercel.app/my-apply'
  
  const { Loader, isLoading, setIsLoading } = useLoader(true)

  const { 
    state, 
    setState, 
    handleChange, 
    handleFormPreviousStep, 
    handleFormNextStep, 
    formStep, 
    setFormStep 
  } = useForm(initialFormData)
  
  const [classes, setClasses] = useState<ClassesProps[]>([])
  const [classSpecs, setClassSpecs] = useState<unknown[]>([])   
  const [applyFormStatus, setApplyFormStatus] = useState(applyFormState.success)

  useEffect(() => {
    axios.get('/api/classes')
    .then(({ data }) => setClasses(data))
    .catch(() => setApplyFormStatus(applyFormState.maintenance))
    .finally(() => setIsLoading(false))

  }, [setIsLoading]);  
  
  const handleClassChange = (value: string) => {   
    setState({
      ...state,
      className: value,
      mainSpec: '',
      offSpec: ''
    });
       
    fetchClassSpecs(value);
  };
  
  const fetchClassSpecs = useCallback((classChosen) => {       
    const selectedClass = classes.filter(option => option.className === classChosen)
    setClassSpecs(selectedClass[0].specializations);
    
  }, [classes]);

  const validateSubmit = !Boolean(
    state.battleTag.length > 0 &&
    state.charName.length > 0 && 
    state.className.length > 0 && 
    state.mainSpec.length > 0
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    setIsLoading(true);

    const data = {
      battleTag: state.battleTag,
      charName: state.charName,
      className: state.className,
      mainSpec: state.mainSpec,
      offSpec: state.offSpec,
      about: state.about
    };

    await axios.post('/api/newApply', data)
      .then(() => {
        setCookie(undefined, '@soa.apply', data.charName, {
          maxAge: 60 * 60 * 24 * 30,
          path: '/'
        })
        setApplyFormStatus(applyFormState.success)
      })
      .catch(() => setApplyFormStatus(applyFormState.error))
      .finally(() => setIsLoading(false))
  }

  const handleFormReset = (event: FormEvent) => {
    event.preventDefault()
    
    setFormStep(1)
    setApplyFormStatus(applyFormState.pending)
  }

  return(  
    <Form 
      onSubmit={handleSubmit} 
      onKeyPress={event => event.key === 'Enter' && event.preventDefault()}
    > 
      { isLoading ? <Loader /> : 
        <> { applyFormStatus === 'PENDING' && (
          <>
            <h2>Formulário de Apply</h2>
            { formStep === 1 &&     
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
                    label="Próximo"
                    type="button" 
                    onClick={handleFormNextStep} 
                    disabled={!Boolean(state.battleTag !== '')}
                  />
                </FormSection>
            } 

            { formStep === 2 &&            
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
                  label="Próximo"
                  type="button" 
                  onClick={handleFormNextStep} 
                  disabled={!Boolean(state.charName !== '')}
                />
                <span onClick={handleFormPreviousStep}>Voltar</span>   
              </FormSection>            
            }

            { formStep === 3 &&
              <FormSection>
                <h3>Classe, spec e off-spec</h3>
                <p>Escolha a sua classe, spec e se possuir uma off-spec</p>
                <Select label="Classe" name="class"value={state.className}>
                  {classes.map(gameClass => 
                    <li key={gameClass._id} onClick={() => handleClassChange(gameClass.className)}>
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
                  >{classSpecs.map((spec: any) => 
                      <li key={spec} onClick={() => setState({...state, mainSpec: spec})}>
                        {spec}
                      </li>
                    )}
                  </Select> }
                { state.mainSpec.length <= 0 ? null :      
                  <Select 
                    label="Off Spec"
                    name="offSpec"
                    value={state.offSpec}
                    onChange={handleChange}                                  
                  >{classSpecs.map((spec: any) => 
                    <li key={spec} onClick={() => setState({...state, offSpec: spec})}>
                      {spec}
                    </li>
                  )}
                </Select> }
                <Button 
                  label="Próximo"
                  type="button" 
                  onClick={handleFormNextStep} 
                  disabled={!Boolean(state.className !== '' && state.mainSpec !== '')}
                />
                <span onClick={handleFormPreviousStep}>Voltar</span>
              </FormSection>
            }

            { formStep === 4 &&
              <FormSection>
                <h3>Informações adicionais</h3>
                <p>Use este espaço para sua apresentação caso queira. Logs, Armory ou Raider.io não são necessários.</p>
                <Textarea
                  label="Informações adicionais"
                  name="about"          
                  value={state.about}
                  onChange={handleChange}
                  />
                <Button label="Próximo" type="button" onClick={handleFormNextStep} />
                <span onClick={handleFormPreviousStep}>Voltar</span>
              </FormSection>
            }

            { formStep === 5 &&
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
                <Button label="Enviar" type="submit" disabled={validateSubmit} />
                <span onClick={handleFormPreviousStep}>Voltar</span>                      
              </FormSection>
            }          
          </>
        )}
        
        { applyFormStatus === 'SUCCESS' &&
          <FormFallback>
            <GoCheck size={140} color="#00ff04" />
            <h3>Apply realizado com sucesso!</h3>
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
              Acompanhe por aqui o status do seu apply
            </a>
            <p>Se tiver dúvidas ou quiser trocar uma idéia direto conosco, entre em contato ou visite nosso discord.</p>
            <p>Shake: shake#1455 - Hammertimèop: celsocontin#1441</p>
            <a href="https://discord.gg/9Be497S" target="_blank" rel="noopener noreferrer">
              <img src="/images/discord_logo.svg" alt="Discord" />
            </a>
          </FormFallback>
        }

        { applyFormStatus === 'ERROR' &&
          <FormFallback>
            <GoX size={140} color="#822121" />
            <h3>Houve um erro ao enviar seu apply!</h3>
            <p>- Certifique-se de que você informou corretamente o nome do seu personagem.</p>
            <p>- Lembre-se! Não é necessário informar o seu servidor. Caso seu personagem não esteja no Azralon, contate-nos diretamente</p>            
            <p>- Caso o erro persista, acesse nosso discord e fale diretamente conosco.</p>
            <a href="https://discord.gg/9Be497S" target="_blank" rel="noopener noreferrer">
              <img src="/images/discord_logo.svg" alt="Discord" />         
            </a>   
            <Button label="Tentar novamente" onClick={handleFormReset} />
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
