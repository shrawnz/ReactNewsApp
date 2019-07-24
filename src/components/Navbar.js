import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// function Navbar(props){
class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchText : "",
        }
    }

    handleChange = (e) => {
        this.setState({searchText: e.target.value});
    }

    render(){
    return <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#" onClick={() => {
            this.props.homeCallback()}}>Home</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Category
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" onClick={() => {
            this.props.categoryCallback("business")}}>Business</a>
            <a class="dropdown-item" href="#" onClick={() => {
            this.props.categoryCallback("entertainment")}}>Entertainment</a>
            <a class="dropdown-item" href="#" onClick={() => {
            this.props.categoryCallback("general")}}>General</a>
            <a class="dropdown-item" href="#" onClick={() => {
            this.props.categoryCallback("health")}}>Health</a>
            <a class="dropdown-item" href="#" onClick={() => {
            this.props.categoryCallback("science")}}>Science</a>
            <a class="dropdown-item" href="#" onClick={() => {
            this.props.categoryCallback("sports")}}>Sports</a>
            <a class="dropdown-item" href="#" onClick={() => {
            this.props.categoryCallback("technology")}}>Technology</a>
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" name="search" type="search" 
        onChange={ this.handleChange } placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success my-2 my-sm-0"
        onClick = {(event) => {event.preventDefault(); this.props.searchCallback(this.state.searchText)}}>Search</button>
      </form>
    </div>
  </nav>
    }
}
export default Navbar;