import React, { Component } from "react";
import { database } from "./firebase";
import _ from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class App extends Component{
  state = {
    title: '',
    body: '',
    posts: {},  
  }

  textInput = null;

  componentDidMount() {
    database.on('value', snapshot => {
      this.setState({
        posts: snapshot.val()
      })
    })
  }

  onInputChange =({ target }) => {
    const {name,value} = target
    this.setState({
      [name]: value
    })    
  }

  onHandleChange = (e) => {
    this.setState({body: e})
  }

  setTextInputRef = element => {
    this.textInput = element;
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    //console.log(post)
    database.push(post)
    alert('Data gayo')
    this.resetUserInputs();
  }

  resetUserInputs = () => {
    this.setState({
      
      title: '',
      body: '',
      answer: ''
    });
  }

  renderPosts() {
    return _.map(this.state.posts,(post,key)=> {
      return (
      <div key={key}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
      )
    })
  }

  render(){
    return (
      <div className="container">
        <form onSubmit={this.onHandleSubmit}>
          <div className="form-group">
          <input type="text" 
            placeholder="Title" 
            value={this.state.title}
            name="title"
            onChange={this.onInputChange}  
            ref={this.setTextInputRef}
            className="form-control" 
            required/>
          </div>
          <div className="form-group">
          <ReactQuill 
          modules={App.modules} 
          formats={App.formats}
            placeholder="Body" 
            name="body"
            value={this.state.body} 
            onChange={this.onHandleChange} 
          />
          </div>
          <div className="form-group">
          <button className="btn btn-primary" >Submit</button>
          </div>
        </form>
      <br/>
      {this.renderPosts()}
      </div>
    )
  }
}

App.modules = {
  toolbar: [
    [{header:'1'},{header:'2'},{header:'3'},{font:[]}],
    [{size: []}],
    ['bold','italic','underline', 'strike', 'blockquote'],
    [{'list': 'ordered'},{'list': 'bullet'}],
    ['link','image','video'],
    ['clean'],
    ['code-block']
  ]
}

App.formats = [
  'header', 'font', 'size','bold','italic','underline',
  'strike', 'blockquote','list','ordered','bullet',
  'link', 'image','video', 'code-block'
]
export default App;