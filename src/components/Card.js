import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Card(props){
    return <div class="container">
    <div class="card shadow-sm mx-auto w-75 mb-4 mt-4">
        <div class="card-body">
        <h5 class="card-title text-dark">{props.title}</h5>
        <p class="card-text text-dark">{props.content} <a href={props.url} target="_blank">Read more</a></p>
        <p class="card-text"><small class="text-muted">{props.publishedAt}</small></p>
        </div>
        <img class="card-img-bottom" src={props.imageUrl} alt="Card image cap"/>
    </div>
    </div>
}

export default Card;