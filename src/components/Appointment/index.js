import React from 'react'
import Header from './Header'
import Show from './Show'
import Form from './Form'
import Empty from './Empty'
import Status from './Status'
import './styles.scss'
import useVisualMode from 'hooks/useVisualMode'

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("interview data", interview);
    transition("SAVING");
    props.bookInterview(props.id, interview);
    transition("SHOW");
  }

  return (
    <article className="appointment">
      <Header></Header>
      {props.time}
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {(
        <Status />
      )}
    </article>

  )
}
