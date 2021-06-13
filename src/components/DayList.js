import React from 'react'
import DayListItem from './DayListItem'

export default function DayList(props) {
  return (
    <ul>
      {
        props.days && props.days.map((day, i)=><DayListItem
         key={i} 
         spots={day.spots}
         name={day.name}
         setDay={props.setDay}
         selected={day.name === props.day}
        />)
      }
    </ul>
  )
}
