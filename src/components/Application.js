import React, { useState, useEffect } from "react";
import Button from "./Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import Appointment from "./Appointment";
import Axios from "axios";
import {getAppointmentsForDay, getInterviewersForDay} from "../helpers/selectors";

import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day : "Monday",
    days : [],
    appointments: {},
    interviewers: []
  });



  let dailyAppointments = [];
  let dailyInterviewers = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state, state.day);

  const setDay = day => setState(prev=>({ ...prev, day }));

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

          console.log("dailyAppointments", dailyAppointments)
         // setDays(getAppointmentsForDay(res.data));
      })
}, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          dailyAppointments.map(appointment=>
            <Appointment 
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={appointment.interview}
            interviewers={dailyInterviewers}
            />
          )
        }
      </section>
    </main>
  );
}
