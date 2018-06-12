import React, { Component } from 'react';
import CommentSection from './components/CommentSection'
import './App.css';

export default class App extends Component {

  state = {
    users: [
      {
        id: 1,
        username: "gagabriel"
      },
      {
        id: 2,
        username: "intergalactic"
      }
    ],
    data: [
      {
        id: 123,
        points: 20,
        createdAt: "2018-03-28T20:15:00.000-04:00",
        text: "Lorem Ipsum",
        user: 1,
        comments: [
          {
            id: 43,
            points: 30,
            createdAt: "2018-03-28T20:16:00.000-04:00",
            text: "Dolor amen",
            user: 2,
            comments: [
              {
                id: 422,
                points: 12,
                createdAt: "2018-03-28T20:17:00.000-04:00",
                text: "Vestibulum lorem purus",
                user: 2,
                comments: [
                  // ...
                ]
              }
            ]
          },
          {
            id: 3201,
            points: 0,
            createdAt: "2018-03-28T20:17:00.000-04:00",
            text: "Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales Nullam hendrerit quis arcu sed sodales",
            user: 1,
            comments: [
              // ...
            ]
          }
        ]
      },
      {
        id: 2,
        points: -2,
        createdAt: "2018-03-28T20:12:00.000-04:00",
        text: "Lorem Ipsum",
        user: 2,
        comments: [
          // ...
        ]
      }
    ]
  }
  vote = this.vote.bind(this);
  onUpvote = this.onUpvote.bind(this, this.vote);
  onDownvote = this.onDownvote.bind(this, this.vote);

  onUpvote(vote, indexArr) {
    vote(indexArr, 1)
  }

  onDownvote(vote, indexArr) {
    vote(indexArr, -1)
  }

  vote(indexArr, val) {

    var data = JSON.parse(JSON.stringify(this.state.data))
    var comments = data
    for (let index of indexArr) {
      var comment = comments[index]
      comment.renderNeededAt = Date.now()
      comments = comment.comments
    }

    if (comment) {
      if (comment.optimisticUpdate && (comment.optimisticUpdate === val)) {
        comment.optimisticUpdate = 0
      } else {
        comment.optimisticUpdate = val
      }
    }
    this.setState({ data })
  }

  render() {
    return (
      <CommentSection 
        users={this.state.users}
        data={this.state.data}
        onUpvote={this.onUpvote}
        onDownvote={this.onDownvote}
      />
    );
  }
}

