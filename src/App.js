import TelaUsuario from './telas/TelaUsuario';
import TelaMensagem from './telas/TelaMensagem';
import TelaMenu from './telas/TelaMenu';
import TelaErro from './telas/TelaErro';
import store from "./redux/store";
import { Provider } from "react-redux";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/FrontendBCC2B/usuarios" element={<TelaUsuario/>} />
            <Route path="/FrontendBCC2B/mensagens" element={<TelaMensagem/>} />
            <Route path="/FrontendBCC2B" element={<TelaMenu/>} />
            <Route path="*" element={<TelaErro/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
