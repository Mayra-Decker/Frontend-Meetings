import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const MeetingForm = () => {
  const [meeting, setMeeting] = useState({
    reunion: '',
    descripcion: '',
    fecha: '',
    hora: '',
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchMeeting = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api-meetings/meetings?id=${id}`);
          setMeeting(response.data[0]);
        } catch (error) {
          console.error('Error fetching meeting:', error);
          setError('Error al cargar la reunión.');
        }
      };
      fetchMeeting();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeeting((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(meeting.hora)) {
      setError('La hora debe estar en formato HH:MM.');
      return;
    }

    const formattedMeeting = {
      ...meeting,
      hora: `${meeting.hora}:00`
    };

    try {
      if (id) {
        const response = await axios.put('http://localhost:8000/api-meetings/meetings', {
          id,
          ...formattedMeeting,
        });
        console.log('Respuesta del PUT:', response.data);
      } else {
        const response = await axios.post('http://localhost:8000/api-meetings/meetings', formattedMeeting);
        console.log('Respuesta del POST:', response.data);
      }

      navigate('/');
    } catch (error) {
      console.error('Error saving meeting:', error);
      setError('Error al guardar la reunión. Inténtelo de nuevo.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Reunión' : 'Agregar Reunion'}</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Reunión</label>
          <input
            type="text"
            className="form-control"
            name="reunion"
            value={meeting.reunion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="descripcion"
            value={meeting.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            name="fecha"
            value={meeting.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            name="hora"
            value={meeting.hora}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Actualizar Reunión' : 'Actualizar Reunion'}
        </button>
      </form>
    </div>
  );
};

export default MeetingForm;
