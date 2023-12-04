import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from '../recursos/estado';
const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';

export const buscarUsuarios = createAsyncThunk('usuarios/buscarUsuarios', async () => {
    try { 
        const resposta = await fetch(urlBase, { method: 'GET' });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: true,
                listaUsuarios: dados.listaUsuarios,
                mensagem: ''
            }
        }
        else {
            return {
                status: false,
                listaUsuarios: [],
                mensagem: 'Ocorreu um erro ao recuperar os usuarios da base de dados.'
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaUsuarios: [],
            mensagem: 'Ocorreu um erro ao recuperar os usuarios da base de dados:' + erro.message
        }
    }
});

export const adicionarUsuario = createAsyncThunk('usuarios/adicionar', async (usuario) => {
    console.log(usuario);
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }).catch(erro => {
        console.log(erro.message);
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao adicionar o usuario:' + erro.message
        }
    });
    if (resposta.ok) {
        console.log("Ok");
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            usuario
        }
    }
    else {
        console.log(usuario);
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao adicionar o usuario.',
            usuario
        }
    }
});

const initialState = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    usuarios: [],
};

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarUsuarios.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Buscando usuarios...";
            })
            .addCase(buscarUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.usuarios = action.payload.listaUsuarios;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(buscarUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message;
            })
            .addCase(adicionarUsuario.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.usuarios.push(action.payload.usuario);
                state.mensagem = action.payload.mensagem;
            })
            .addCase(adicionarUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Adicionando usuario...";
            })
            .addCase(adicionarUsuario.rejected, (state, action) => {
                state.mensagem = "Erro ao adicionar o usuario: " + action.error.message;
                state.estado = ESTADO.ERRO;
            })
    }
});

export default usuarioSlice.reducer;