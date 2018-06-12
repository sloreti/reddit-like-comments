import React from 'react';
import Comment from './Comment'

export default function CommentSection(props) {

  return (
      <div className="comment-section">
        {
          props.data.map((comment, index) =>
            <Comment
              key={comment.id}
              comment={comment}
              users={props.users}
              onUpvote={props.onUpvote}
              onDownvote={props.onDownvote}
              indexArr={[index]}
            />
          )
        }
      </div>
  );
  
}