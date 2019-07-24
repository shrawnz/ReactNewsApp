import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

class Card extends Component{

    constructor(props){
        super(props);
        this.state = {
            bookmarkBtnText : "Bookmark",
            url: this.props.url
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.url !== state.url) {
          return {
            bookmarkBtnText : "Bookmark",
            url: props.url
          };
        }
        // Return null to indicate no change to state.
        return null;
    }
    
    onBookmarkClick = () => {
        if(this.state.bookmarkBtnText === "Bookmark"){
            this.props.bookmarkCallback(this.props.index);
            this.setState({bookmarkBtnText:"Bookmarked!"})
        }
    }
    render(){
    return <div class="container">
    <div class="card shadow-sm mx-auto w-75 mb-4 mt-4">
        <div class="card-body">
        <h5 class="card-title text-dark">{this.props.title}</h5> 
        <p class="card-text text-dark">{this.props.content} <a href={this.props.url} target="_blank">Read more</a></p>
        <p class="card-text"><small class="text-muted">{this.props.publishedAt}</small></p>
        <a ref="bookmarkBtn" class="mx-auto" href="#!" onClick={() => {
            this.onBookmarkClick();}}>{this.state.bookmarkBtnText}</a>
        </div>
        <img class="card-img-bottom" src={this.props.imageUrl} alt="Card image cap"/>
    </div>
    </div>
    }
}
export default Card;