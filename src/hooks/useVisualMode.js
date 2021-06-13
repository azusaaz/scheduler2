import { useState } from 'react';

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  let tmp = [...history];

  function transition(mode, replace) {
    if (replace){
      tmp[tmp.length-1] = mode
      setHistory(tmp); 
    } else {
      tmp.push(mode)
      setHistory(tmp);
    }
    setMode(tmp[tmp.length-1]);
  }

  function back(){

    if (tmp.length > 1){
      tmp.pop()
      setHistory(tmp);
    }

    setMode(tmp[tmp.length-1]);
}

  return { mode, transition, back }
}