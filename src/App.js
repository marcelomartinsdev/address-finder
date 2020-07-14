import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import schema from './schema';
import './App.css';

function App() {

  function onSubmit(values, actions) {
    console.log('SUBMIT', values)
  }

  function onBlurCep(ev, setFieldValue) {

    const { value } = ev.target

    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then ((res) => res.json())
      .then((data) => {
        setFieldValue('bairro', data.bairro)
        setFieldValue('cidade', data.localidade)
        setFieldValue('logradouro', data.logradouro)
        setFieldValue('uf', data.uf)
      })
  }

  return (
  <div className="App">
    <header>
      <h1>Adress Finder</h1>
    </header>
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        name: '',
        email: '',
      }}
      render={( { isValid, setFieldValue } ) => (
      <Form>
        <div className="form-control-group">
          <label>Name</label>
          <Field className="field" name="name" type="text"/>
          <div className="error-message">
          <ErrorMessage
          name="name" />
          </div>
        </div>
        <div className="form-control-group">
          <label>CEP</label>
          <Field className="field" name="cep" type="text" onBlur={(ev) => onBlurCep(ev, setFieldValue)}/>
        </div>
        <div className="form-control-group">
          <label>Logradouro</label>
          <Field className="field" name="logradouro" type="text"/>
        </div>
        <div className="form-control-group">
          <label>Numero</label>
          <Field className="field" name="numero" type="text"/>
        </div>
        <div className="form-control-group">
          <label>Complemento</label>
          <Field className="field" name="complemento" type="text"/>
        </div>
        <div className="form-control-group">
          <label>Bairro</label>
          <Field className="field" name="bairro" type="text"/>
        </div>
        <div className="form-control-group">
          <label>Cidade</label>
          <Field className="field" name="cidade" type="text"/>
        </div>
        <div className="form-control-group">
          <label>Estado</label>
          <Field component="select" className="field" name="uf" type="text" >
            <option value={null}>Selecione o Estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espirito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </Field>
        </div>
        <button className="btn" type="submit" disabled={!isValid}>Enviar</button>
      </Form>
      )}
      />
      
    <div className="footer">
      <a href="https://www.linkedin.com/in/marcelo-martins-moreira">
      <i class="fab fa-linkedin" ></i>
      </a>
      Projeto feito por: Marcelo Martins Dev
      <a href="https://github.com/marcelomartinsdev">
      <i class="fab fa-github" ></i>
      </a>
    </div>
  </div>
  );
}

export default App;
