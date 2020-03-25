import React, { useEffect, useState } from 'react';
import './Profile.styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongID = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongID,
      }
    }).then(Response => {
      setIncidents(Response.data)
    })
  }, [ongID]);

  const handleDeleteIncidents = async (id) => {
    try {
      await api.delete(`incident/${id}`, {
        headers: {
          Authorization: ongID
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('ERRO AO DELETAR CASO!!')
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="be the hero" />
        <span> Bem vinda, {ongName}</span>
        <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (

          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>Descrição:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
            <button onClick={() => handleDeleteIncidents(incident.id)} type="button"><FiTrash2 size={20} color="#a8a8b3" /></button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile;
