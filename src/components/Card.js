import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Card(props){
    return <div class="container">
    <div class="card">
        <div class="card-body">
        <h5 class="card-title text-dark">{props.title}</h5>
        <p class="card-text text-dark">{props.content}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
        <img class="card-img-bottom" src={props.imageUrl} alt="Card image cap"/>
    </div>
    </div>
    // return <div>
    //     <div className="card" key={props.index}>
    //       <div className="content">
    //         <h4>
    //           <a href={props.url} target="_blank" rel="noopener noreferrer">
    //             {props.title}
    //           </a>
    //         </h4>
    //         <p>{props.content}</p>
    //       <div className="image">
    //         <img src={props.imageUrl} alt="" />
    //       </div>
    //     </div>
    // </div> </div>
}

export default Card;