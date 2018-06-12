import React,  { Component } from 'react';

export default class Comment extends Component {

  userLookup = this.userLookup.bind(this);

  shouldComponentUpdate(nextProps) {
    // Only update if new renderNeededAt timestamp present
    return this.props.comment.renderNeededAt !== nextProps.comment.renderNeededAt 
  }
  
  userLookup(id) {
    var user = this.props.users.find( u => u.id === id )
    return user ? user.username : ""
  } 

  elapsedTime() {
    var createdAt = new Date(this.props.comment.createdAt)
    var now = new Date()
    return this.simplePrettyTime(now - createdAt);
  }

  simplePrettyTime(ms) {
    ms = Math.abs(ms)
    var prettyTime;
    if (ms >= 1000*60*60*24*365) {
      prettyTime = Math.floor(ms / (1000*60*60*24*365)) + " years"
    } else if (ms >= 1000*60*60*24*30) {
      prettyTime = Math.floor(ms / (1000*60*60*24*30)) + " months"
    } else if (ms >= 1000*60*60*24) {
      prettyTime = Math.floor(ms / (1000*60*60*24)) + " days"
    } else if (ms >= 1000*60*60) {
      prettyTime = Math.floor(ms / (1000*60*60)) + " hours"
    } else {
      prettyTime = Math.floor(ms / (1000*60)) + " minutes"
    }
    // Remove pluralization if needed and return
    return prettyTime.split(" ")[0] === "1" ? prettyTime.slice(0,-1) : prettyTime  
  } 

  render() {

    var optimisticUpdate = this.props.comment.optimisticUpdate ? this.props.comment.optimisticUpdate : 0

    return (
    	<div  className="comment">
        <div className="flex singleComment">
          <VoteCol 
            optimisticUpdate={optimisticUpdate}
            onUpvote={this.props.onUpvote}
            onDownvote={this.props.onDownvote}
            indexArr={this.props.indexArr}
          />
    	    <div>
    	    	<a className="username smallType">{this.userLookup(this.props.comment.user)}</a>
            <span className="smallType">{this.props.comment.points + optimisticUpdate} points</span>
            <span className="smallType">{this.elapsedTime()} ago</span>
    	    	<div>{this.props.comment.text}</div>
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
    <div className="voteCol noselect">
      <div className={isUpvoted ? 'upvote active' : 'upvote'} onClick={onUpvote}>
        ▲
      </div>
      <div className={isDownvoted ? 'downvote active' : 'downvote'} onClick={onDownvote}>
        ▼
      </div>
    </div>
  );
}