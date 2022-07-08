import {ValidaCPF} from './modules/ValidaCPF.js'

class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
    }

    evento() {
        this.formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            this.controlaEvento();
        })
    }

    controlaEvento() {
        const usuarioValido = this.usuarioSaoValidos();
        const senhaValida = this.senhasSaoValidas();

        if(usuarioValido && senhaValida) {
            alert('Usuário cadastrado com sucesso!')
        }
    }

    usuarioSaoValidos() {
        let valid = true;

        for(let textError of this.formulario.querySelectorAll('.txt-error')){
            textError.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            if(!campo.value) {
                this.criaError(campo, "O campo não pode estar em branco.");
                valid = false;
            }
            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo.value)) {
                    this.criaError(campo, 'CPF inválido.')
                    valid = false;
                }
            }
            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo.value)) {
                    this.criaError(campo, 'Usuário inválido.')
                    valid = false;
                }
            }
        }

        return valid;
    }

    senhasSaoValidas() {
        let valid = true
        const senha = document.querySelector('.senha');
        const repetirSenha = document.querySelector('.repetir-senha');

        if(senha.length < 6 || senha.length > 12) {
            valid = false;
        }
        if(repetirSenha.value != senha.value) {
            this.criaError(repetirSenha, 'Senha repetida está diferente de senha.')
            valid = false;
        }
        return valid;
    }

    validaUsuario(usuario) {
        let valid = true;
        if(usuario.length < 3 || usuario.length > 12) {
            valid = false;
        }
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            valid = false;
        }
        return valid;
    }


    validaCPF(cpf) {
        const valida = new ValidaCPF(cpf);
        return valida.valida();
    }

    criaError(campo, msg) {
        const div = document.createElement('div');
        div.classList.add('txt-error')
        div.innerText = msg;
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();
valida.evento();