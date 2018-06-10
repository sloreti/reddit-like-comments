import React,  { Component } from 'react';

export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optimisticUpdate: 0
    }
    this.vote = this.vote.bind(this)
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
    return now - createdAt;
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
    	    	<a className="username">{this.props.user}</a>
            <span className="points">{this.state.points}</span>
            <span className="createdAt">{this.elapsedTime()}</span>
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