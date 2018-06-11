import React,  { Component } from 'react';

export default class Comment extends Component {

  userLookup = this.userLookup.bind(this);
  
  userLookup(id) {
    return this.props.users.find( u => u.id === id ).username
  } 

  elapsedTime() {
    var createdAt = new Date(this.props.comment.createdAt)
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

    console.log(`${this.props.comment.id} just rendered`);
    var optimisticUpdate = this.props.comment.optimisticUpdate ? this.props.comment.optimisticUpdate : 0

    return (
    	<div  className="comment">
        <div className="flex">
          <VoteCol 
            optimisticUpdate={optimisticUpdate}
            onUpvote={this.props.onUpvote}
            onDownvote={this.props.onDownvote}
            indexArr={this.props.indexArr}
          />
    	    <div>
    	    	<a className="username">{this.userLookup(this.props.comment.user)}</a>
            <span className="points">{this.props.comment.points + optimisticUpdate} points</span>
            <span className="createdAt">{this.elapsedTime()} ago</span>
            <span className="showHide">[-]</span>
    	    	<p>{this.props.comment.text}</p>
    	    </div>
        </div>
  	    {
          this.props.comment.comments.map((comment, index) =>
            <Comment
              key={comment.id}
              comment={comment}
              users={this.props.users}
              onUpvote={this.props.onUpvote}
              onDownvote={this.props.onDownvote}
              indexArr={this.props.indexArr.slice().concat(index)}
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

  var onUpvote = () => {
    props.onUpvote(props.indexArr)
  }

  var onDownvote = () => {
    props.onDownvote(props.indexArr)
  }

  return (
    <div>
      <div className={isUpvoted ? 'upvote active' : 'upvote'} onClick={onUpvote}>
        ▲
      </div>
      <div className={isDownvoted ? 'downvote active' : 'downvote'} onClick={onDownvote}>
        ▼
      </div>
    </div>
  );
}