import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const MeetingTable = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api-meetings/meetings');
      setMeetings(response.data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Confirmar Eliminacion',
      message: '¿Estas seguro de que quieres eliminar esta reunion?',
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:8000/api-meetings/meetings?id=${id}`);
              fetchMeetings();
            } catch (error) {
              console.error('Error deleting meeting:', error);
            }
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleEdit = (id) => {
    navigate(`/manage/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Aquí se mostrarán tus reuniones programadas</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Reunión</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.id}</td>
              <td>{meeting.reunion}</td>
              <td>{meeting.descripcion}</td>
              <td>{meeting.fecha}</td>
              <td>{meeting.hora}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(meeting.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(meeting.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingTable;
