import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorList.css";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="doctor-card"
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
    >
      <div className="card-header">
        <h3>
          Dr. {doctor.firstName} {doctor.lastName}
        </h3>
        <span className="specialization">{doctor.specialization}</span>
      </div>

      <div className="card-body">
        <div className="detail">
          <span className="label">Experience:</span>
          <span>{doctor.experience} years</span>
        </div>

        <div className="detail">
          <span className="label">Fees:</span>
          <span>₹{doctor.feesPerCunsaltation}</span>
        </div>

        <div className="detail">
          <span className="label">Timings:</span>
          <span>
            {doctor.timings[0]} - {doctor.timings[1]}
          </span>
        </div>
      </div>

      <button
        className="book-btn"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/doctor/book-appointment/${doctor._id}`);
        }}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorList;
