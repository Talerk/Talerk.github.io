import React, { useState } from 'react'
import classes from './MyCard.module.css'



export const MyCard = (props) => {

  return (
    <div 
    style={props.turned 
        ? {pointerEvents: 'none', border: 'none'}
        : {pointerEvents: props.pointerEvent}}
        className={classes.myCard} {...props}
      
        >
      {props.turned
        ? <><img src={props.src} className={classes.myImg}/>{props.name}</>
        : <span style={{fontSize: 100}}>?</span>}
    </div>
  )
}
