import React, { useState } from 'react';
import axios from 'axios';

function Form(){

    const [campos, setCampos] = useState({
        nome: '',
        endereco: '',
        telefone: ''
    });

    const [ret, setRet] = useState('');

    function handleInputChange(event){
        if(event === undefined){
            console.log('evento undefined');
        }else{
            campos[event.target.name] = event.target.value;
            console.log(event.target.name)
            setCampos(campos);
        }
    }

    function handleFormSubmit(event){
        event.preventDefault();
        console.log(campos);
        axios.post('http://localhost:5000/gravar', campos).then(response => {
            setRet(response.data.primeironome);
        })
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <fieldset>
                    <legend>
                        <h2>Dados de Cadastro</h2>
                    </legend>
 
                    <div>
                        <label>Nome:
                            <input type="text" name="nome" id="nome" onChange={handleInputChange} />
                        </label>
                        <label>Endereco:
                            <input type="text" name="endereco" id="endereco" onChange={handleInputChange} />
                        </label>
                        <label>Telefone:
                            <input type="text" name="telefone" id="telefone" onChange={handleInputChange} />
                        </label>
                    </div>
 
                    <input type="submit" value="Salvar" />
                    <div><p>Retornou: {ret}</p></div>
                </fieldset>
            </form>
        </div>
    )
}
export default Form;