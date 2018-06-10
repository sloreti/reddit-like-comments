import React, { Component } from 'react';
import CommentSection from './components/CommentSection'
import { USERS, DATA } from './api/data'
import './App.css';

export default class App extends Component {

  onUpvote() {

  }

  onDownvote() {

  }

  render() {
    return (
      <div className="App">
        <CommentSection 
          users={USERS}
          data={DATA}
          onUpvote={this.onUpvote}
          onDownvote={this.onDownvote}
        />
      </div>
    );
  }
}

