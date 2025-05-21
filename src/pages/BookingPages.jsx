// import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { DatePicker, message, TimePicker, Card } from "antd";
// import moment from "moment";
// import { useDispatch, useSelector } from "react-redux";
// import { showLoadings, hideLoading } from "../redux/features/alertSlice";
// import "../styles/Booking.css"

// const BookingPage = () => {
//   const { user } = useSelector((state) => state.user);
//   const params = useParams();
//   const [doctors, setDoctors] = useState([]);
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState();
//   const [isAvailable, setIsAvailable] = useState(false);
//   const dispatch = useDispatch();

//   // login user data
//   const getUserData = async () => {
//     try {
//       const res = await axios.post(
//         "https://vercel-backend-henna.vercel.app/api/v1/doctor/getDoctorById",
//         { doctorId: params.doctorId },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//       if (res.data.success) {
//         setDoctors(res.data.data);
//       }
//     } catch (error) {
//     }
//   };

//   // ============ handle availability
//   const handleAvailability = async () => {
//     try {
//       dispatch(showLoadings());
//       const res = await axios.post(
//         "https://vercel-backend-henna.vercel.app/api/v1/user/booking-availability",
//         { doctorId: params.doctorId, date, time },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         setIsAvailable(true);
//         message.success(res.data.message);
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());

//     }
//   };

//   // =============== booking func
//   const handleBooking = async () => {
//     try {
//       setIsAvailable(true);
//       if (!date && !time) {
//         return alert("Date & Time Required");
//       }
//       dispatch(showLoadings());
//       const res = await axios.post(
//         "https://vercel-backend-henna.vercel.app/api/v1/user/book-appointment",
//         {
//           doctorId: params.doctorId,
//           userId: user._id,
//           doctorInfo: doctors,
//           userInfo: user,
//           date: date,
//           time: time,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         message.success(res.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());

//     }
//   };

//   useEffect(() => {
//     getUserData();
//     //eslint-disable-next-line
//   }, []);

//   return (
//     <Layout>
//       <div className="simple-booking-container">
//         <Card className="simple-booking-card">
//           <h3 className="simple-booking-title">Book Your Appointment</h3>

//           {doctors && (
//             <div className="simple-doctor-info">
//               <h4 className="simple-doctor-name">
//                 Dr. {doctors.firstName} {doctors.lastName}
//               </h4>

//               <div className="simple-doctor-details">
//                 <p><strong>Fee:</strong> ₹{doctors.feesPerCunsaltation}</p>
//                 <p>
//                   <strong>Available:</strong> {doctors.timings?.[0]} - {doctors.timings?.[1]}
//                 </p>
//               </div>

//               <div className="simple-booking-form">
//                 <div className="form-group">
//                   <label>Select Date</label>
//                   <DatePicker
//                     className="simple-date-picker"
//                     format="DD-MM-YYYY"
//                     onChange={(value) => setDate(value.format("DD-MM-YYYY"))}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Select Time</label>
//                   <TimePicker
//                     className="simple-time-picker"
//                     format="HH:mm"
//                     onChange={(value) => setTime(value.format("HH:mm"))}
//                   />
//                 </div>

//                 <div className="simple-action-buttons">
//                   <button
//                     className="simple-check-btn"
//                     onClick={handleAvailability}
//                   >
//                     Check Availability
//                   </button>
//                   <button
//                     className={`simple-book-btn ${isAvailable ? 'available' : ''}`}
//                     onClick={handleBooking}
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Card>
//       </div>
//     </Layout>
//   );
// };

// export default BookingPage;

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker, Card } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoadings, hideLoading } from "../redux/features/alertSlice";
import "../styles/Booking.css";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "https://vercel-backend-henna.vercel.app/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {}
  };

  // ============ handle availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoadings());
      const res = await axios.post(
        "https://vercel-backend-henna.vercel.app/api/v1/user/booking-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoadings());
      const res = await axios.post(
        "https://vercel-backend-henna.vercel.app/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="simple-booking-container">
        <Card className="simple-booking-card">
          <h3 className="simple-booking-title">Book Your Appointment</h3>

          {doctors && (
            <div className="simple-doctor-info">
              <h4 className="simple-doctor-name">
                Dr. {doctors.firstName} {doctors.lastName}
              </h4>

              <div className="simple-doctor-details">
                <p>
                  <strong>Fee:</strong> ₹{doctors.feesPerCunsaltation}
                </p>
                <p>
                  <strong>Available:</strong> {doctors.timings?.[0]} -{" "}
                  {doctors.timings?.[1]}
                </p>
              </div>

              <div className="simple-booking-form">
                <div className="form-group">
                  <label>Select Date</label>
                  <DatePicker
                    className="simple-date-picker"
                    format="DD-MM-YYYY"
                    onChange={(value) => setDate(value.format("DD-MM-YYYY"))}
                  />
                </div>

                <div className="form-group">
                  <label>Select Time</label>
                  <TimePicker
                    className="simple-time-picker"
                    format="HH:mm"
                    onChange={(value) => setTime(value.format("HH:mm"))}
                  />
                </div>

                <div className="simple-action-buttons">
                  <button
                    className="simple-check-btn"
                    onClick={handleAvailability}
                  >
                    Check Availability
                  </button>
                  <button
                    className={`simple-book-btn ${
                      isAvailable ? "available" : ""
                    }`}
                    onClick={handleBooking}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default BookingPage;
