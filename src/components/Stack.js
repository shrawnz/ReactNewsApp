import React, {Component} from 'react';
import Card from './Card';
import Navbar from './Navbar';

class Stack extends Component {
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            updateCounter: 0,
        }
    }
    // componentDidUpdate(){
    //     console.log("UPDATE HUA");
    // }
    hitNewsAPI = (url) => {
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                articles: data.articles,
                updateCounter: this.state.updateCounter + 1
            })
            console.log(this.state.articles);
        })
        .catch(console.log)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.updateCounter !== nextState.updateCounter }

    componentDidMount() {
        this.homeCallback();
    }

    homeCallback = () => {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=" + process.env.REACT_APP_API_KEY;
        this.hitNewsAPI(url);       
    }

    searchCallback = (q) => {
        let url = "https://newsapi.org/v2/everything?country=in&q=" + q + "&apiKey=" + process.env.REACT_APP_API_KEY;
        this.hitNewsAPI(url)
    }

    categoryCallback = (category) => {
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=" + category + "&apiKey=" + process.env.REACT_APP_API_KEY;
        console.log(url);
        this.hitNewsAPI(url)
    }

    renderCard = (i) => {
        var article = this.state.articles[i];
        var content = (article.content !== null) ? article.content.substring(0, 260) : ""
        return <Card 
            index = {i}
            url = {article.url}
            imageUrl = {article.urlToImage}
            content = {content}
            title = {article.title}
            publishedAt = {new Date(article.publishedAt).toLocaleString()}>
            </Card>
    }
    

    render() {
        return <div><Navbar 
        categoryCallback = {this.categoryCallback}
        searchCallback = {this.searchCallback}
        homeCallback = {this.homeCallback}></Navbar>
        {this.state.articles.map((article, i) => {                
           // Return the element. Also pass key     
           return (this.renderCard(i)); 
        })}
        </div>
    }
}
export default Stack;