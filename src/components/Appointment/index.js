import React from 'react'
import Header from './Header'
import Show from './Show'
import Form from './Form'
import Empty from './Empty'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'
import './styles.scss'
import useVisualMode from 'hooks/useVisualMode'

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  

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
    props.bookInterview(props.id, interview)
      .then(res=>{
        transition("SHOW");
      })
      .catch(res=>{
        transition("ERROR_SAVE", true);
      })

  }

  function del() {
    transition("CONFIRM");
  }

  function edit() {
    transition("EDIT");
  }

  function confirm() {
    transition("SAVING", true);
    props.cancelInterview(props.id)
      .then(res=>{
        transition("EMPTY");
      })
      .catch(res=>{
        transition("ERROR_DELETE", true);
      })
   
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
          onDelete={del}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status />
      )}
      {mode === CONFIRM && (
        <Confirm 
        onCancel={back}
        onConfirm={confirm}
        />
      )}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Save failed"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Delete failed"
          onClose={back}
        />
      )}
    </article>

  )
}
