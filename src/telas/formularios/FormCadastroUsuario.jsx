import { useState} from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel} from 'react-bootstrap';
import { adicionarUsuario } from '../../redux/usuarioReducer';
import { useSelector, useDispatch } from 'react-redux';
import ESTADO from '../../recursos/estado';

export default function FormCadastroUsuario(props){
    
    const usuarioVazio = {
        nickname: '',
        urlAvatar: ''
    }
    const [usuario, setUsuario] = useState(usuarioVazio);
    const [formValidado, setFormValidado] = useState(false);
    const { estado/*, mensagem*//*, usuarios */} = useSelector((state) => state.usuario);
    const dispatch = useDispatch();

    function manipularMudancas(e){
        const componente = e.currentTarget;
        setUsuario({...usuario,[componente.name]:componente.value});
    }

    function manipularSubmissao(e){
        const form = e.currentTarget; 
        if (form.checkValidity()){
            dispatch(adicionarUsuario(usuario));
            setUsuario(usuarioVazio);
            setFormValidado(false);
        }
        else{
            setFormValidado(true);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    /*if(estado === ESTADO.ERRO) {

    }
    else 
    if(estado === ESTADO.PENDENTE) {

    }
    else{*/
    if(estado === ESTADO.OCIOSO){
        return (
            <Container>
                <h2>Cadastro de Usuarios</h2>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="NickName:"
                                    className="mb-3"
                                >

                                    <Form.Control
                                        type="text"
                                        placeholder="0"
                                        id="nickname"
                                        name="nickname"
                                        value={usuario.nickname}
                                        onChange={manipularMudancas}
                                    />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o nickname do usuário!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="url do Avatar:"
                                    className="mb-3"
                                >
                                <Form.Control type="text" placeholder="Informe a URL do Avatar d Usuário" id="urlAvatar" name="urlAvatar" value={usuario.urlAvatar} onChange={manipularMudancas} required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe a URL do Avatar do usuário!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{"Cadastrar"}</Button>
                        </Col>
                        <Col md={6} offset={5}>
                            <Button type="button" variant={"secondary"} onClick={()=>{
                                props.exibirFormulario(false);
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}