import React from "react";

function Die(props) {
    return (
        <div className={props.isHeld ? "die--div green" : "die--div white"} onClick={props.holdDice}>
            <h2 className="die--h3">{props.value}</h2>
        </div>
    )
}

export default Die