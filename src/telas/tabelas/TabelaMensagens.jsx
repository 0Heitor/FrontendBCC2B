import { Button, Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarMensagens } from "../../redux/mensagemReducer";
import ESTADO from "../../recursos/estado";
import { useEffect } from "react";

export default function TabelaMensagem(props) {
    
    const { estado/*, mensagem*/, mensagens } = useSelector(state => state.mensagem);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarMensagens());
    }, [dispatch]);
    
    if (estado === ESTADO.PENDENTE) {

    }
    else if (estado === ESTADO.ERRO) {
        
    }
    else {
        return (
            <Container>
                <Button type="button" onClick={()=>{
                    props.exibirFormulario(true)
                }}>Nova Mensagem</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Data e Hora</th>
                            <th>Usuario</th>
                            <th>Mensagem</th>
                            <th>Status Lida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mensagens.map((mensagem) => {
                                return (
                                    <tr key={mensagem.id}>
                                        <td>{mensagem.dataHora}</td>
                                        <td>{mensagem.usuario.nickname}</td>
                                        <td>{mensagem.mensagem}</td>
                                        <td>{mensagem.lida ? "Lida" : "Não Lida"}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}