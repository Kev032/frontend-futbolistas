import React, { useState, useEffect } from 'react';
import { Futbolista } from '../model/Futbolista';
import { getFutbolistaById, updateFutbolista } from '../service/futbolistaService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UpdateFutbolista: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [futbolista, setFutbolista] = useState<Futbolista | null>(null);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchFutbolista = async () => {
      try {
        const data = await getFutbolistaById(Number(id));
        data.fechaNacimiento = data.fechaNacimiento.split('T')[0];
        setFutbolista(data);
      } catch (error) {
        console.error('Error fetching futbolista:', error);
      }
    };

    fetchFutbolista();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (futbolista) {
      if (name === 'posicion') {
        setFutbolista({
          ...futbolista,
          posicion: {
            id: Number(value),
            nombre: futbolista.posicion.nombre
          }
        });
      } else {
        setFutbolista({
          ...futbolista,
          [name]: value
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (futbolista) {
      try {
        await updateFutbolista(Number(id), futbolista);
        MySwal.fire({
          title: 'Actualización Exitosa',
          text: 'El futbolista fue actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/');
        });
      } catch (error) {
        console.error('Error updating futbolista:', error);
      }
    }
  };

  if (!futbolista) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="sr-only">Cargando...</span></div></div>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h1 className="mb-0">Actualizar Futbolista</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombres</label>
              <input
                type="text"
                className="form-control"
                name="nombres"
                value={futbolista.nombres}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Apellidos</label>
              <input
                type="text"
                className="form-control"
                name="apellidos"
                value={futbolista.apellidos}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                className="form-control"
                name="fechaNacimiento"
                value={futbolista.fechaNacimiento}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Características</label>
              <textarea
                className="form-control"
                name="caracteristicas"
                value={futbolista.caracteristicas}
                onChange={handleChange}
                rows={3}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Posición</label>
              <select
                className="form-control"
                name="posicion"
                value={futbolista.posicion.id}
                onChange={handleChange}
              >
                <option value="1">Arquero</option>
                <option value="2">Defensa</option>
                <option value="3">Mediocampista</option>
                <option value="4">Delantero</option>
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success mt-3">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFutbolista;
