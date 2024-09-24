import React from "react";  
import './Form.css'

function Form() {
    return (
        <div className="body">
            <h1>Formulario de Clima y Nivel Hidrométrico</h1>
            <form id="clima-form">
                <div>
                    <label htmlFor="clima">Estado del Clima:</label>
                    <select id="clima" name="clima" required>
                        <option value="">Seleccione...</option>
                        <option value="soleado">Soleado</option>
                        <option value="nublado">Nublado</option>
                        <option value="lluvioso">Lluvioso</option>
                        <option value="ventoso">Ventoso</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="nivel-hidrometrico">Nivel Hidrométrico (cm):</label>
                    <input type="number" id="nivel-hidrometrico" name="nivel-hidrometrico" required min="0" />
                </div>

                <div>
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default Form