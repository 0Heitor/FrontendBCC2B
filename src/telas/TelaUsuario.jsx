import { Container } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroUsuario from "./formularios/FormCadastroUsuario";
import TabelaUsuario from "./tabelas/TabelaUsuarios";

export default function TelaUsuario(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    
    return (
        <Container>
            <Pagina>
                {
                    exibirFormulario ? <FormCadastroUsuario exibirFormulario={setExibirFormulario}/>
                                        :
                                        <TabelaUsuario exibirFormulario={setExibirFormulario}/>
                }
            </Pagina>
        </Container>
    )
}