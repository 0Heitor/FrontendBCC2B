import { Container } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroMensagem from "./formularios/FormCadastroMensagem";
import TabelaMensagem from "./tabelas/TabelaMensagens";

export default function TelaMensagem(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    
    return (
        <Container>
            <Pagina>
                {
                    exibirFormulario ? <FormCadastroMensagem exibirFormulario={setExibirFormulario}/>
                                        :
                                        <TabelaMensagem exibirFormulario={setExibirFormulario}/>
                }
            </Pagina>
        </Container>
    )
}