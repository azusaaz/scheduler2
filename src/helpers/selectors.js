export function getAppointmentsForDay(state, day){
  let arr = [];
  let filtered = state.days && state.days.find(d => d.name === day);
  if (filtered && filtered.appointments){
    filtered.appointments.forEach(id=>{
      arr.push(state.appointments[id]);
    })
  }

  return arr;
}

export function getInterviewersForDay(state, day){
  let arr = [];
  let filtered = state.days && state.days.find(d => d.name === day);
  
  if (filtered && filtered.interviewers){
    filtered.interviewers.forEach(id=>{
      arr.push(state.interviewers[id]);
    })
  }

  return arr;
}

export function getInterview(state, interview){
  
  if (interview != null) {
    return {...interview, ...{interviewer: state.interviewers[interview.interviewer]}}
  } else {
    return null;
  }
}
