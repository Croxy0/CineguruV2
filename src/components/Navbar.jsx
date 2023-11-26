import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import UserContext from './UserContext';
import axios from 'axios';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const { setParams } = useContext(DataContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');

    const logout = () => {
        axios.get('http://localhost:5000/logout', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setUser(null);
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (title.trim() !== '') {
            setParams(title); // Actualiza los parámetros de búsqueda en el contexto
            navigate('/'); // Redirige a la página de búsqueda
            setTitle(''); // Limpia el campo de búsqueda después de la búsqueda
        }
    }

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <h1>CineGuru</h1>
            </Link>
            <div className="user-menu">
                {user && <span>Bienvenido, {user.usuario_nombre}</span>}
                {user && <Link to="/favoritos">Ver favoritos</Link>}
                {user ? (
                    <Link to="#" onClick={logout}>Cerrar Sesión</Link>
                ) : (
                    <Link to="/inicio_sesion">Iniciar sesión</Link>
                )}
            </div>
            <form className="form-inline" onSubmit={handleSearch}>
                <input
                    className="form-control search-input"
                    type="text"
                    placeholder="Buscar películas..."
                    aria-label="Buscar"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    className="search-button"
                    type="submit"
                >
                    Buscar
                </button>
            </form>
        </nav>
    )
}

export default Navbar;
