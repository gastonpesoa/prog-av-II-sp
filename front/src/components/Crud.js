import React, { useEffect, useState } from 'react'
import Form from './Form'
import Loader from './Loader'
import Table from './Table'

const URL = "http://localhost:3000/api/mascotas/";

const Crud = () => {

    const [mascotas, setMascotas] = useState([])
    const [mascotaEdit, setMascotaEdit] = useState(null)
    const [loading, setloading] = useState(false)
    const [token, setToken] = useState(null)


    useEffect(() => {
        const getMascotas = async (url) => {
            setloading(true);
            try {
                const token = localStorage.getItem("token")
                if (token) {
                    setToken(token)
                    const res = await fetch(url, {
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    const data = await res.json();
                    console.log("mascotas: ", data);
                    setMascotas(data.data);
                    setloading(false);
                }
            } catch (error) {

            }
        }
        getMascotas(URL)
    }, [])

    const crearMascota = (nuevaMascota) => {
        nuevaMascota.id = Date.now();
        setloading(true);
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(nuevaMascota)
        })
            .then(res => res.json())
            .then(mascota => {
                setMascotas(mascotas => [...mascotas, mascota.data])
            })
            .finally(() => {
                alert("Alta Okey!")
                setloading(false);
            })
    }

    const modificarMascota = (mascotaAModificar) => {
        setloading(true);
        fetch(URL + mascotaAModificar.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(mascotaAModificar)
        })
            .then(res => res.json())
            .then(mascotaModificada => {
                console.log(`mascotaModificada`, mascotaModificada.data)
                setMascotas((mascotas) => {
                    return mascotas.map((mascota) =>
                        mascota.id === mascotaModificada.data.id ? mascotaModificada.data : mascota
                    )
                })
            })
            .finally(() => {
                alert("Modificacion Okey!")
                setloading(false);
            })
    }

    const borrarMascota = (id) => {
        if (window.confirm("Confirma eliminacion de " + id)) {
            setloading(true);
            fetch(URL + id, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(`mascotaBorrada`, res)
                    if (res.ok) {
                        setMascotas((mascotas) => {
                            return mascotas.filter(mascota => mascota.id !== id)
                        })
                    }
                })
                .finally(() => {
                    alert("Eliminado Okey!")
                    setloading(false);
                })
        }
    }

    return (
        <div className="columns">
            <div className="column">
                <section className="section">
                    {
                        loading
                            ? (<Loader />)
                            : (<Table
                                data={mascotas}
                                setMascotaEdit={setMascotaEdit}
                                borrarMascota={borrarMascota}
                            />)
                    }
                </section>

            </div>
            <div className="column">
                <section className="section">
                    <Form
                        crearMascota={crearMascota}
                        modificarMascota={modificarMascota}
                        setMascotaEdit={setMascotaEdit}
                        mascotaEdit={mascotaEdit}
                    />
                </section>
            </div>
        </div>
    )
}

export default Crud
