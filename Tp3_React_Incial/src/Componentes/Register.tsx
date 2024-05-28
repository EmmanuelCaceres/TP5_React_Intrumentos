import Usuario from "../Entities/Usuario"
import { useRef } from "react";
import { registerUser } from "../Functions/FunctionsApi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {

    const [user, setUser] = useState<Usuario>(new Usuario());

    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = formRef.current;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            form.classList.add('was-validated');
            try {
                console.log(user)
                await registerUser<Usuario>(user);
            } catch (error) {
                console.error('Error registering user:', error);
            }
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rolUser = e.target.value;
        setUser({
            ...user,
            rol: rolUser
        });
    }


    return (
        <>
            <form ref={formRef} noValidate className="row g-3 needs-validation" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombreUsuario" className="form-label">Nombre del usuario</label>
                    <input type="text"
                        name="nombreUsuario"
                        className="form-control"
                        id="nombreUsuario"
                        aria-describedby="nombreUsuarioHelp"
                        defaultValue={user.nombreUsuario}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, ingrese un nombre de usuario válido.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="clave" className="form-label">Clave</label>
                    <input type="password"
                        className="form-control"
                        name="clave"
                        id="clave"
                        defaultValue={user.clave}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor, ingrese una clave válida.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="rol" className="form-label">Seleccione un rol</label>
                    <select className="form-select"
                        id="rol"
                        name="rol"
                        value={user.rol}
                        onChange={handleChangeSelect}
                        required>
                        <option selected disabled value="">Elija una opcion</option>
                        <option value="Admin">Admin</option>
                        <option value="Operador">Operador</option>
                        <option value="Visor">Visor</option>
                    </select>
                    <div className="invalid-feedback">
                        Por favor seleccione un rol
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
            
        </>
    )
}