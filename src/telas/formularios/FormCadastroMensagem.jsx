import { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel} from 'react-bootstrap';
import { adicionarMensagem } from '../../redux/mensagemReducer';
import { buscarUsuarios } from '../../redux/usuarioReducer';
import { useSelector, useDispatch } from 'react-redux';
import ESTADO from '../../recursos/estado';

export default function FormCadastroMensagem(props){
    
    const mensagemVazio = {
        id: '0',
        dataHora: '',
        lida: '',
        mensagem: '',
        usuario: {
            id: 0,
            nickname: '',
            urlAvatar: '',
            dataIngresso: '',
            mensagens: []
        }
    }
    //const estadoInicialProduto = props.produtoParaEdicao;
    const [mensagem, setMensagem] = useState(mensagemVazio);
    const [formValidado, setFormValidado] = useState(false);
    const { estado: estadoM, mensagem: mensagemM/*, mensagens */} = useSelector((state) => state.mensagem);
    const { estado: estadoU, mensagem: mensagemU, usuarios } = useSelector((state) => state.usuario);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarUsuarios());
    }, [dispatch]);

    function manipularMudancas(e){
        const componente = e.currentTarget;
        setMensagem({...mensagem,[componente.name]:componente.value});
    }

    function selecionaCategoria(e){
        const componente = e.currentTarget;
        setMensagem({...mensagem, usuario:{
            "id" : componente.value
        }});
        console.log(mensagem);
    }

    function manipularSubmissao(e){
        const form = e.currentTarget; 
        if (form.checkValidity()){
            dispatch(adicionarMensagem(mensagem));
            setMensagem(mensagemVazio);
            setFormValidado(false);
        }
        else{
            setFormValidado(true);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    
    if(estadoM === ESTADO.OCIOSO){
        return (
            <Container>
                <h2>Cadastro de Mensagens</h2>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row>
                        <Col md={3}>
                            <FloatingLabel label="Usuários:">
                                <Form.Select aria-label="Seleciona um usuário" value={mensagem.usuario.id} id="usuario" name="usuario" onChange={selecionaCategoria} required>
                                    <option value="-1" selected>Selecione um Usuário</option>
                                    {
                                        usuarios?.map((usu) => {
                                            return(
                                                <option key={usu.id} value={usu.id}>{usu.nickname}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Mensagem:"
                                    className="mb-3"
                                >

                                    <Form.Control
                                        type="text"
                                        placeholder="0"
                                        id="mensagem"
                                        name="mensagem"
                                        value={mensagem.mensagem}
                                        onChange={manipularMudancas}
                                    />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe a mensagem!</Form.Control.Feedback>
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