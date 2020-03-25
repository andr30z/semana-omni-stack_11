import React, { useState } from 'react';
import "./index.styles.css";
import HeroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

//
export default function Logon() {
  //justify content é horizontal

  const [id, setId] = useState('');
  const history=useHistory();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/sessions', { id })
      console.log(response.data.name);
      localStorage.setItem('ongId',id);
      localStorage.setItem('ongName',response.data.name);
      history.push('/profile');
    } catch (error) {
      alert('FALHA NO LOGIN, TENTE NOVAMENTE')
    }
  }


  return (
    <div>
      <div className="logon-container">
        <section className="form">
          <img src={logoImg} alt="BE THE HERO" />
          <form onSubmit={handleLogin}>
            <h1>Faça seu login</h1>
            <input onChange={(e)=>setId(e.target.value)} type="text" placeholder="Sua ID" />
            <button className="button" type="submit">Entrar</button>
            <Link className="back-link" to='/register'>
              <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
            </Link>
          </form>
        </section>
        <img src={HeroesImg} alt="heroes" />
      </div>
    </div>
  )
}
