import { useContext, useState } from "react"; 
import { DataContext } from "../context/DataContext";

const FormSearch = () => { const [title, setTitle] = useState(''); 
const { setParams, error } = useContext(DataContext);

const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') { 
        setParams(title);
    }
}

return ( 
    <div className="form-search">
        <h2>CineGuru</h2>
        <p>Tu guía cinematográfica a un solo clic</p>
        <form onSubmit={ handleSubmit }>
            <input type="text" placeholder="Nombre de la película" onChange={e=>setTitle(e.target.value)}/>
            <input type="submit" value="Buscar" />
        </form>
        { error === true && <p className="error">No se encuentra esta película </p> }
    </div>
)

}

export default FormSearch;

