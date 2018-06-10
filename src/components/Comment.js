import React,  { Component } from 'react';

export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      points: this.props.initialPoints
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
          <div>
            <div>
              <button>▲</button>
            </div>
            <div>
              <button>▼</button>
            </div>
          </div>
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