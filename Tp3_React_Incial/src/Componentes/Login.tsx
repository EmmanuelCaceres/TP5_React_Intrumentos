import Usuario from "../Entities/Usuario"
import { useRef } from "react";
import { loginUser } from "../Functions/FunctionsApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

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
                const result = await loginUser(user);
                if (typeof result === 'string') {
                    alert(result);
                  } else if (result && typeof result === 'object') {
                    
                    localStorage.setItem('usuario', JSON.stringify(result));
            navigate('/instrumentos', {
                replace: true,
                state: {
                    logged: true,
                    usuario: user
                },
		    });
                    
            } 
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
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>
            <a href="registro">¿Todavía no tiene un usuario? Registrese aquí</a>
        </>
    )
}