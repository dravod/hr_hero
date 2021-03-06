import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./index.css"
//Actions and Context
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_EMPLOYEE, LOADING,ADD_SKILL,REMOVE_SKILL } from "../../utils/actions";
import API from "../../utils/API";
//Util
import PowersList from "./PowersList";
//Assets
import QuestionMark from "../../assets/img/questionMark.png"
//Bootstrap Components
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

const NewEmployeeForm= ()=>{
    //Form References
    const titleRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const portraitRef = useRef();
    const skillsRef = useRef();
    //state
    const [state, dispatch] = useStoreContext();
    const history = useHistory();
    const handleSkillChange = e => {
        if(e.target.checked){
            dispatch({type: ADD_SKILL, skill:e.target.name});
        }else{
            dispatch({type: REMOVE_SKILL, skill:e.target.name});
        }
    }
    const handleSubmit = e =>{
        e.preventDefault();
        dispatch({type: LOADING});
        API.addEmployee({
            title: titleRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            portrait: portraitRef.current.value,
            skills: state.formSkills
        })
        .then(result=>{
            dispatch({
                type:ADD_EMPLOYEE,
                employee:result.data
            });
            history.push("/")
        })
        .catch(err=>console.log(err));
            titleRef.current.value = "";
            firstNameRef.current.value = "";
            lastNameRef.current.value = "";
            emailRef.current.value = "";
            portraitRef.current.value = "";
            skillsRef.current.value = [];
    }
    return (
    <Form id="form-container" onSubmit={handleSubmit}>
        <Form.Row>
            <Col md={3}>
                <Image id="form-image" fluid style={{backgroundColor:"black"}} src={QuestionMark}/>
                <Form.Control ref={portraitRef}placeholder="Portrait URL" />
            </Col>
            <Col>
            <Form.Row>
                <Col>
                    <Form.Control ref={titleRef} placeholder="Title" />
                </Col>
                <Col>
                    <Form.Control ref={firstNameRef} placeholder="First name" />
                </Col>
            </Form.Row>
            <Form.Row>
            <Col>
                <Form.Control ref={emailRef} placeholder="Email" />
                </Col>
                <Col>
                <Form.Control ref={lastNameRef} placeholder="Last name" />
            </Col>
            
            </Form.Row>
            <Form.Row id="form-skillbox">
            {PowersList.map((power) => (
                <Col xs={4} key={power}>
                <Form.Check 
                    onChange={handleSkillChange}
                    type={"checkbox"}
                    id={power}
                    label={power}
                    ref={skillsRef}
                    name={power}    
                />
                
                </Col>
            ))}
            </Form.Row>
            </Col>
        </Form.Row>
        <Form.Row className="justify-content-md-center"> 
                <Button type="submit" id='submit-button' variant="primary" size="lg" block>
                    HIRE
                </Button>
        </Form.Row>   
    </Form>
    )
}
export default NewEmployeeForm;