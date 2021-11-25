import React, { Component } from 'react'
import Titulo from './Titulo';

class Header extends Component {
    render() {
        return (
            <section className="section">
                <header>
                    <Titulo>CRUD DE MASCOTAS</Titulo>
                </header>
            </section>
        )
    }
}

export default Header;