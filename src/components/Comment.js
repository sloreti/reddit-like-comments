import React,  { Component } from 'react';

export default class Comment extends Component {

  state = { optimisticUpdate: 0 };
  vote = this.vote.bind(this);
  userLookup = this.userLookup.bind(this);
  
  userLookup(id) {
    return this.props.users.find( u => u.id === id ).username
  } 

  vote(optimisticUpdate) {
    if (optimisticUpdate === this.state.optimisticUpdate) {
      this.setState({ optimisticUpdate: 0 })
    } else {
      this.setState({ optimisticUpdate })
    }
  }


  elapsedTime() {
    var createdAt = new Date(this.props.createdAt)
    var now = new Date()
    return this.simplePrettyTime(now - createdAt);
  }

  simplePrettyTime(ms) {
    ms = Math.abs(ms)
    if (ms >= 1000*60*60*24*365) {
      return Math.floor(ms / (1000*60*60*24*365)) + " years"
    } else if (ms >= 1000*60*60*24*30) {
      return Math.floor(ms / (1000*60*60*24*30)) + " months"
    } else if (ms >= 1000*60*60*24) {
      return Math.floor(ms / (1000*60*60*24)) + " days"
    } else if (ms >= 1000*60*60) {
      return Math.floor(ms / (1000*60*60)) + " hours"
    } else {
      return Math.floor(ms / (1000*60)) + " minutes"
    }
  } 

  render() {
    return (
    	<div  className="comment">
        <div className="flex">
          <VoteCol 
            optimisticUpdate={this.state.optimisticUpdate}
            vote={this.vote} 
          />
    	    <div>
    	    	<a className="username">{this.userLookup(this.props.user)}</a>
            <span className="points">{this.props.initialPoints + this.state.optimisticUpdate} points</span>
            <span className="createdAt">{this.elapsedTime()} ago</span>
            <span className="showHide">[-]</span>
    	    	<p>{this.props.text}</p>
    	    </div>
        </div>
  	    {
          this.props.comments.map((comment) =>
            <Comment
              id={comment.id}
              key={comment.id}
              initialPoints={comment.points}
              createdAt={comment.createdAt}
              text={comment.text}
              user={comment.user}
              comments={comment.comments}
              users={this.props.users}
            />
          )
        }
      </div>
    );
  }
}

function VoteCol(props) {

  var isUpvoted = props.optimisticUpdate === 1
  var isDownvoted = props.optimisticUpdate === -1

  return (
    <div>
      <div className={isUpvoted ? 'upvote active' : 'upvote'} onClick={() => props.vote(1)}>
        ▲
      </div>
      <div className={isDownvoted ? 'downvote active' : 'downvote'} onClick={() => props.vote(-1)}>
        ▼
      </div>
    </div>
  );
}