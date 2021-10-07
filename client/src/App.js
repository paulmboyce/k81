import React, { useEffect, useState } from "react";

import { getPath, postPath } from "./_MIDDLE/gateway/endpoint";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [eventBus, setEventBus] = useState([]);

  useEffect(() => {
    const asyncCalls = async () => {
      setPosts(await getPath("http://localhost:4001/articles"));
      setComments(await getPath("http://localhost:4002/comments"));
      setPostComments(await getPath("http://localhost:4003/articlecomments"));
      setEventBus(await getPath("http://localhost:4000/bus"));
    };

    asyncCalls();
  }, []);

  useEffect(() => {
    console.log("POSTS (updated): ");
    posts.forEach((p) => console.log("Post: ", p.title));
  }, [posts]);

  useEffect(() => {
    console.log("COMMENTS (updated): ");
    comments.forEach((c) => console.log("Comment: ", c.text));
  }, [comments]);

  useEffect(() => {
    console.log("POST COMMENTS (updated): ", postComments);
  }, [postComments]);

  // do this for each postComment
  const extractPostComments = () => {
    return Object.values(postComments).map((postComment) => {
      // Get the title
      console.log("postComment ==> ", postComment);
      return (
        <div key={postComment.postId}>
          <p>
            <strong>Article: {postComment.title}</strong>
          </p>
          {postComment.comments.map((comment) => (
            <p key={comment.id}> - {comment.text}</p>
          ))}
        </div>
      );
    });
  };

  return (
    <div>
      <button
        onClick={async () => {
          await postPath("http://localhost:4001/article", {
            title: "My post title",
          });
        }}
      >
        Add Post
      </button>
      <div>Checking Event Bus Service:</div>
      <div>
        <p>
          <strong>GOT: ---> {eventBus.length} Events</strong>
        </p>
      </div>
      <div>Checking Post Service:</div>
      <div>
        <strong>
          GOT: --->
          {posts.map((post) => (
            <div key={post.id}>
              <p>
                {post.title}
                <button
                  onClick={async () => {
                    await postPath(
                      `http://localhost:4002/post/${post.id}/comment`,
                      {
                        text: "My comment text",
                      }
                    );
                  }}
                >
                  Add Comment
                </button>
              </p>
            </div>
          ))}
        </strong>
      </div>
      <div>Checking Comments Service:</div>
      <div>
        <strong>
          GOT: --->
          {comments.map((comment) => (
            <p key={comment.id}>{comment.text}</p>
          ))}
        </strong>
      </div>
      <div>Checking Post Comments Service:</div>
      <div>
        GOT: --->
        {extractPostComments()}
      </div>
    </div>
  );
};

export default App;
