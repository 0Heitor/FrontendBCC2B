import { Button, Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarUsuarios } from "../../redux/usuarioReducer";
import ESTADO from "../../recursos/estado";
import { useEffect } from "react";

export default function TabelaUsuarios(props) {
    
    const { estado/*, mensagem*/, usuarios } = useSelector(state => state.usuario);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarUsuarios());
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
                }}>Novo Usuário</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Nome</th>
                            <th>Data de Ingresso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((usuario) => {
                                return (
                                    <tr key={usuario.id}>
                                        <td><img width={"90px"} src={usuario.urlAvatar}></img></td>
                                        <td>{usuario.nickname}</td>
                                        <td>{usuario.dataIngresso}</td>
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