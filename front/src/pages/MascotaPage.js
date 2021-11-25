import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

const MascotaPage = () => {

    const [loading, setloading] = useState(false)
    const { id } = useParams();
    const [mascota, setMascota] = useState({})
    const { nombre, edad, tipo, vacunado, observaciones } = mascota;
    const navigate = useNavigate()

    useEffect(() => {
        const URL = "http://localhost:3000/api/mascotas";
        setloading(true);
        let token = localStorage.getItem("token")
        if (!token) {
            navigate('/login')
        } else {
            fetch(`${URL}/${id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(res => res.ok ? res.json() : Promise.reject(res.status + ":" + res.statusText))
                .then(data => {
                    setMascota(data.data)
                    setloading(false);
                })
                .catch((error) => {
                    console.error(error)
                    setloading(false);
                })
        }        
    }, [id])

    return (
        <section className="section">
            {
                loading
                    ? (<Loader />)
                    : (
                        <div className="container">
                            <Link to="/"><button className="button is-rounded">Volver</button></Link>
                            <div className="card">
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-4"> {nombre}</p>
                                            <p className="subtitle is-6">Edad: {edad}</p>
                                            <p className="subtitle is-6">{tipo}</p>
                                            <p className="subtitle is-6">Vacunado: {vacunado ? "SI" : "NO"}</p>
                                        </div>
                                    </div>

                                    <div className="content">
                                        {observaciones}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </section>
    )
}

export default MascotaPage
