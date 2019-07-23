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
        let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=55ffbe3b23e244469c35f15e37f86378';
        this.hitNewsAPI(url);
    }

    searchCallback = (q) => {
        let url = "https://newsapi.org/v2/top-headlines?country=in&q=" + q + "&apiKey=55ffbe3b23e244469c35f15e37f86378";
        this.hitNewsAPI(url)
    }

    categoryCallback = (category) => {
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=" + category + "&apiKey=55ffbe3b23e244469c35f15e37f86378";
        console.log(url);
        this.hitNewsAPI(url)
    }

    renderCard = (i) => {
        return <Card 
            index = {i}
            url = {this.state.articles[i].url}
            imageUrl = {this.state.articles[i].urlToImage}
            content = {this.state.articles[i].content}
            title = {this.state.articles[i].title}
            source = {this.state.articles[i].source.name}>
            </Card>
    }
    

    render() {
        return <div><Navbar 
        categoryCallback = {this.categoryCallback}
        searchCallback = {this.searchCallback}></Navbar>
        {this.state.articles.map((article, i) => {                
           // Return the element. Also pass key     
           return (this.renderCard(i)); 
        })}
        </div>
    }
}
export default Stack;