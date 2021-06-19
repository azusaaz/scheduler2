import React, { useState, useEffect } from "react";
import Axios from "axios";


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day : "Monday",
    days : [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState(prev=>({ ...prev, day }));

  const bookInterview = (id, interview) => {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state, 
      appointments,
    });

    return Axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview: interview
    });
  }

  const cancelInterview = (id) => {
    return Axios.delete(`http://localhost:8001/api/appointments/${id}`);

  }

  useEffect(()=>{
    Promise.all([
      Axios.get("http://localhost:8001/api/days"),
      Axios.get("http://localhost:8001/api/appointments"),
      Axios.get("http://localhost:8001/api/interviewers")
    ])
      .then(all=>{
          console.log("all", all)
          setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
          console.log("state.appointments", state.appointments)
          console.log("state.state", state)
      })
}, []);

  return {state, setDay, bookInterview, cancelInterview};
}
