import React from 'react';
import Comment from './Comment'

export default function CommentSection(props) {

  return (
    <div className="comment-section">
      {
        props.data.map((comment) =>
          <Comment
            id={comment.id}
            key={comment.id}
            initialPoints={comment.points}
            createdAt={comment.createdAt}
            text={comment.text}
            user={comment.user}
            comments={comment.comments}
            users={props.users}
          />
        )
      }
    </div>
  );
  
}