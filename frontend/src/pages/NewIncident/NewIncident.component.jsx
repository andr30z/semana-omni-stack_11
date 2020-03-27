import React, { useState } from 'react';
import './NewIncident.styles.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';


//
export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');

  const handleNewIncident = async (e) => {
    e.preventDefault();
    const data = { title, value, description }

    try {
      await api.post('incident', data, {
        headers: {
          Authorization: ongId,
        }
      });
      setDesc('');
      setValue('');
      setTitle('');
    } catch (error) {
      alert('ERRO AO CADASTRAR CASO, TENTE NOVAMENTE');
    }

  }
  return (
    <div className="newincident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link className="back-link" to='/profile'>
            <FiArrowLeft size={16} color="#E02041" />
          Pagina Inicial
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo do caso" />
          <textarea value={description} onChange={e => setDesc(e.target.value)} placeholder="Descrição" />
          <input value={value} onChange={e => setValue(e.target.value)} placeholder="Valor em Reais " />
          <button className="button" type="submit">Cadastrar novo caso</button>

        </form>
      </div>
    </div>
  )
}
