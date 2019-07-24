import React, {Component} from 'react';
import Card from './Card';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

class Stack extends Component {
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            updateCounter: 0,
            apiError: false
        }
    }
    // componentDidUpdate(){
    //     console.log("UPDATE HUA");
    // }
    hitNewsAPI = (url) => {
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            if(data.status !== "error") {
                this.setState({
                    articles: data.articles,
                    updateCounter: this.state.updateCounter + 1
                })
                console.log(this.state.articles);
            } else {
                this.setState({apiError:true, updateCounter: this.state.updateCounter + 1})
            }
        })
        .catch(console.log)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.updateCounter !== nextState.updateCounter }

    componentDidMount() {
        this.homeCallback();
        localStorage.setItem('bookmarks',JSON.stringify({}));
    }

    componentWillUnmount () {
        localStorage.set('bookmarks', JSON.stringify(this.state.articles));
      }

    homeCallback = () => {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=" + process.env.REACT_APP_API_KEY;
        this.hitNewsAPI(url);       
    }

    searchCallback = (q) => {
        let url = "https://newsapi.org/v2/everything?q=" + q + "&apiKey=" + process.env.REACT_APP_API_KEY;
        this.hitNewsAPI(url)
    }

    categoryCallback = (category) => {
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=" + category + "&apiKey=" + process.env.REACT_APP_API_KEY;
        console.log(url);
        this.hitNewsAPI(url)
    }

    bookmarkCallback = (i) => {
        var article = this.state.articles[i];
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks[article.url] = article;
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    getBookmarks = () => {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        console.log(bookmarks);
        this.setState({
            articles: Object.values(bookmarks),
            updateCounter: this.state.updateCounter + 1,
        })
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
            publishedAt = {new Date(article.publishedAt).toLocaleString()}
            bookmarkCallback = {this.bookmarkCallback}>
            </Card>
    }

    renderLoader = () => {
        if(this.state.articles.length === 0 && !this.state.apiError){
        return <div class="mt-4"><div class="text-center">
                <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
                </div></div></div>
        }
        return <div></div>;
    }

    renderErrorPage = () => {
        return <h4 class="mt-4 ml-4">API Request Failed! Please try again.</h4>
    }

    renderNewsStack = () => {
        return <div>{this.state.articles.map((article, i) => {                
            // Return the element. Also pass key     
            return (this.renderCard(i)); 
         })}</div>
    }

    renderStack = () => {
        if(this.state.apiError)
            return this.renderErrorPage();
        return this.renderNewsStack();
    }
 
    renderNavbar = () => {
        return <Navbar 
        categoryCallback = {this.categoryCallback}
        searchCallback = {this.searchCallback}
        homeCallback = {this.homeCallback}
        getBookmarks = {this.getBookmarks}></Navbar>
    }

    render() {
        return <div>
        {this.renderNavbar()}
        {this.renderLoader()}
        {this.renderStack()}
        </div>
    }
}
export default Stack;