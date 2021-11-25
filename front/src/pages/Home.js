import React, { useEffect } from 'react'
import Header from '../components/Header';
import Crud from '../components/Crud';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate('/login')
      }
    }
    getToken()
  }, [])
  const handleCerrarSesion = () => {
    localStorage.removeItem("token")
    navigate('/login')
  }
  return (
    <div className="container">
      <button class="button is-text" onClick={handleCerrarSesion}>Cerrar sesión</button>
      <Header />
      <Crud />
    </div >
  );
}

export default Home
