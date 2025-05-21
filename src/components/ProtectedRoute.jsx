// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { hideLoading, showLoadings } from "../redux/features/alertSlice";
// import { setUser } from "../redux/features/userSlice";

// function ProtectedRoute({ children }) {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);

//   // get user
//   const getUser = async () => {
//     try {
//       // dispatch(showLoadings());
//       const res = await axios.post(
//         "https://vercel-backend-henna.vercel.app/api/v1/user/getUserData",
//         {
//           token: localStorage.getItem("token"),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         dispatch(setUser(res.data.data));
//       } else {
//         <Navigate to="/login" />;
//         localStorage.clear();
//       }
//     } catch (error) {
//       localStorage.clear();
//       dispatch(hideLoading());
//     }
//   };

//   useEffect(() => {
//     if (!user) {
//       getUser();
//     }
//   }, [user, getUser]);

//   if (localStorage.getItem("token")) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// }

// export default ProtectedRoute;


import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoadings, hideLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      dispatch(showLoadings());
      const res = await axios.post(
        "https://vercel-backend-henna.vercel.app/api/v1/user/getUserData",
        {}, // Don't need to send token in body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      console.error("Auth Error:", error.message);
      localStorage.clear();
      dispatch(hideLoading());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only call getUser once, if user is not already set
    if (!user) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []); // Empty dependency array ensures it runs only once

  if (loading) return null; // optionally, return a spinner component

  // If token is missing, redirect to login
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
