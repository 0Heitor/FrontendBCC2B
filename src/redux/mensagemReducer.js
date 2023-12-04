import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from '../recursos/estado';
const urlBase = 'https://backend-bcc-2-b.vercel.app/mensagem';

export const buscarMensagens = createAsyncThunk('mensagens/buscarmensagens', async () => {
    try { 
        const resposta = await fetch(urlBase, { method: 'GET' });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: true,
                listaMensagens: dados.listaMensagens,
                mensagem: ''
            }
        }
        else {
            return {
                status: false,
                listaMensagens: [],
                mensagem: 'Ocorreu um erro ao recuperar as mensagens da base de dados.'
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaMensagens: [],
            mensagem: 'Ocorreu um erro ao recuperar as mensagens da base de dados:' + erro.message
        }
    }
});

export const adicionarMensagem = createAsyncThunk('mensagens/adicionar', async (mensagens) => {
    console.log(mensagens);
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mensagens)
    }).catch(erro => {
        console.log(erro.message);
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao adicionar a mensagem:' + erro.message
        }
    });
    if (resposta.ok) {
        console.log("Ok");
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            mensagens
        }
    }
    else {
        console.log(mensagens);
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao adicionar a mensagem.',
            mensagens
        }
    }
});

const initialState = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    mensagens: [],
};

const mensagemSlice = createSlice({
    name: 'mensagem',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarMensagens.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Buscando mensagens...";
            })
            .addCase(buscarMensagens.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.mensagens = action.payload.listaMensagens;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(buscarMensagens.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message;
            })
            .addCase(adicionarMensagem.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagens.push(action.payload.mensagens);
                state.mensagem = action.payload.mensagem;
            })
            .addCase(adicionarMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Adicionando mensagem...";
            })
            .addCase(adicionarMensagem.rejected, (state, action) => {
                state.mensagem = "Erro ao adicionar a mensagem: " + action.error.message;
                state.estado = ESTADO.ERRO;
            })
    }
});

export default mensagemSlice.reducer;