import React, { useEffect, useState } from "react";

import { getPath } from "./_MIDDLE/gateway/endpoint";

const App = () => {
  const [posts, setPosts] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    const asyncCalls = async () => {
      setPosts(await getPath("http://localhost:4001/"));
      setComments(await getPath("http://localhost:4002/"));
    };

    asyncCalls();
  }, []);

  return (
    <div>
      <div>Checking Post Service:</div>
      <div>
        <p>
          <strong>GOT: ---> {posts}</strong>
        </p>
      </div>
      <div>Checking Comments Service:</div>
      <div>
        <p>
          <strong>GOT: ---> {comments}</strong>
        </p>
      </div>
    </div>
  );
};

export default App;
