import React from 'react';
import { Link } from 'react-router-dom';
import MeetingTable from '../components/MeetingTable';

const Home = () => {
  return (
    <div className="container mt-4">
      <MeetingTable />
      <div className="text-center mt-4">
        <Link to="/manage" className="btn btn-primary">
          Agregar
        </Link>
      </div>
    </div>
  );
};

export default Home;

