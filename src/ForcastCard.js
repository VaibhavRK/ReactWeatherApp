import React from 'react'

const ForcastCard = (props) => {
  return (
    <div className="details">
        <h4>{props.ele.date}</h4>
        <img src={props.ele.day.condition.icon} alt="" />
        <h4 style={{fontSize:'0.9rem',color:'white',textShadow:'0 0 10px black'}} >{props.ele.day.condition.text}</h4>
        <h4 style={{fontSize:'0.9rem'}}> <span style={{color:'#03fc45',textShadow:'0 0 10px black'}}> Avg temp:</span> <span style={{color:'white',textShadow:'0 0 10px black'}}>{props.ele.day.avgtemp_c}&#176;C</span> </h4>
    </div>
  )
}

export default ForcastCard