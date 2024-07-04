import React, { useState, useEffect } from 'react';
import { Futbolista } from '../model/Futbolista';
import { getFutbolistas, getFutbolistaById } from '../service/futbolistaService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const API_URL = 'http://localhost:8080/futbolista';

const FutbolistaList: React.FC = () => {
    const [futbolistas, setFutbolistas] = useState<Futbolista[]>([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const MySwal = withReactContent(Swal);
  
    useEffect(() => {
      fetchFutbolistas(page, size);
    }, [page, size]);
  
    const fetchFutbolistas = async (page: number, size: number) => {
      try {
        const data = await getFutbolistas(page, size);
        setFutbolistas(data);
      } catch (error) {
        console.error('Error fetching futbolistas:', error);
      }
    };
  
    const showDetails = async (id: number) => {
      try {
        const data = await getFutbolistaById(id);
        MySwal.fire({
          title: <strong>Detalles del Futbolista</strong>,
          html: (
            <div>
              <p><strong>Nombres:</strong> {data.nombres}</p>
              <p><strong>Apellidos:</strong> {data.apellidos}</p>
              <p><strong>Fecha de Nacimiento:</strong> {new Date(data.fechaNacimiento).toLocaleDateString()}</p>
              <p><strong>Características:</strong> {data.caracteristicas}</p>
              <p><strong>Posición:</strong> {data.posicion.nombre}</p>
            </div>
          ),
          icon: 'info'
        });
      } catch (error) {
        console.error('Error fetching futbolista:', error);
      }
    };
  
    return (
      <div className="container mt-5">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Fecha de Nacimiento</th>
              <th>Posición</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {futbolistas.map((futbolista) => (
              <tr key={futbolista.id}>
                <td>{futbolista.id}</td>
                <td>{futbolista.nombres}</td>
                <td>{futbolista.apellidos}</td>
                <td>{new Date(futbolista.fechaNacimiento).toLocaleDateString()}</td>
                <td>{futbolista.posicion.nombre}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => showDetails(futbolista.id)}
                  >
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-primary"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Anterior
          </button>
          <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
            Siguiente
          </button>
        </div>
      </div>
    );
  };
  
  export default FutbolistaList;