import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props) {
    return (
        <>
            <Cabecalho conteudo='Sistema de Bate-Papo' />
            <Menu />
            <div>
                {props.children} 
            </div>
        </>
    )
}
