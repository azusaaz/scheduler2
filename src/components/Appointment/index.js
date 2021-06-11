import React from 'react'
import Header from './Header'
import './styles.scss'

export default function Appointment(props) {
  return (
    <div>
       <article className="appointment">{props.time}</article>
    </div>
  )
}
