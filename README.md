## Overview

This repo contains a React implementation of Reddit-like comments. It consists of the following components:
  * **App**: Root component in which `data` and `users` are stored in state, and `onUpvote` and `onDownvote` are implemented.
  * **CommentSection**: A functional container component for all comments. Takes in the 4 required props as specified in the assignment.
  * **Comment**: A component representing an individual comment and its descendants.
  * **VoteCol**: A small functional component representing the voting controls. Also in Comment.js.

### Install and Run
From root dir
``` bash
npm install
```
and then
``` bash
npm start # for developer mode, or
npm run build # for production
```

### Voting
Voting is performed by setting an `optimisticUpdate` field in an individual comment to 1, 0, or -1. **App's** `vote()` function exactly mimics how voting works on Reddit, allowing votes, cancellation of votes, and preventing double votes. The **VoteCol** component receives this field as a prop and conditionally renders `className=active` accordingly. Where we optimistically update the UI in `vote()` is where we would also make an API call (POST /vote/{commentId}/ ?) in a real application. 

### Performance Considerations
To improve performance, a **Comment** component receives the prop `indexArr`, which is an array of indices keeping track of where it is in the `state.data` comment tree. Thus when a user clicks an upvote or downvote arrow, the **App's** `vote()` function does not have to traverse a large comment tree looking for the correct comment `id`, it can index directly into the nested comment. By consuming a bit more memory to maintain `indexArr`s, we save on computation.


But this leads to another easy pitfall: when `state.data` is updated, all **Comments** and their children will try to rerender. PureComponents don’t work as an optimization because React only does a shallow comparison of state and props and that won’t work with our nested `state.data` object. So to avoid excessive rerenders, we implement `shouldComponentUpdate()` in the **Comment** component. When **App's** `vote()` function is called, we set a `renderNeededAt` timestamp in only the relevant comments. Then when `state.data` is updated, `shouldComponentUpdate()` only rerenders comments in which `renderNeededAt` has changed.


Profiled in Chrome Dev Tools, this optimization leads to about a **2.5x speed up** (mean of 66ms vs. mean of 166ms when tested with 100 comments, mean of 122ms vs. mean of 295ms when tested with 200 comments). 

### Additional Comments
Facebook's Create-React-App was chosen as a starter kit because, in addition to Webpack and Babel, it includes important libraries I use during development like ESLint and Jest.

A simple snapshot test with Jest is included in App.test.js. It demonstrates clicking an upvote twice. Unit tests of **Comment's** `simplePrettyTime()` are included in Comment.test.js.


## Further Optimizations

1. [React Virtualized](https://github.com/bvaughn/react-virtualized): 
   When comment chains extend beyond the height of the window, we would want to use the React Virtualized library to prevent the rendering of nonvisible comments.

2. [Immutable.js](https://facebook.github.io/immutable-js/): 
   On line 83 of App.js, I use the `JSON.parse(JSON.stringify())` trick to make a copy of our current `state.data`. In the context of a larger application where we have other objects and arrays that we don't want to mutate, it may make sense to add Immutable.js as a dependency.


