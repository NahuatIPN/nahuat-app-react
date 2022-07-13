import Navbar from "../navbar/navbar";
import "./styles_database.css";

const Database = () =>{
    return(<>
      <Navbar/>
        <div className="table-database">
        <p className="title">Base de datos</p>
            <table>
                <tr>
                    <th>Nahuat</th>
                    <th>Significado</th>
                </tr>
                <tr>
                    <td>Amachiwa</td>
                    <td>V.i Hacer papel.</td>
                </tr>
                <tr>
                    <td>Amachnamakani</td>
                    <td>Sust. Agentivo vendedor de libros.</td>
                </tr>
                <tr>
                    <td>Atzupelek</td>
                    <td>Sust. Agua azucarada.</td>
                </tr>
                <tr>
                    <td>Chiltamal</td>
                    <td>Sust. tamal de chile, hecho con ají verde.</td>
                </tr>
                <tr>
                    <td>Elutamal</td>
                    <td>Sust. tamal de elote</td>
                </tr>
                <tr>
                    <td>Eshutamal</td>
                    <td>Sust. tamal de ejotes.</td>
                </tr>
            </table>
        </div>
    </>)
}

export default Database