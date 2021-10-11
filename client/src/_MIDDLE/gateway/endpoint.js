import axios from "axios";

export const POSTS_SERVICE_URI = "http://localhost:30001";
export const COMMENTS_SERVICE_URI = "http://localhost:30002";
export const POST_COMMENTS_SERVICE_URI = "http://localhost:30003";

/* PARAMS example:  
{
  ID: 12345,
}
*/
const getPath = async (path, params = {}) => {
  try {
    const response = await axios.get(path, {
      params: params,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const postPath = async (path, payload = {}) => {
  try {
    const response = await axios.post(path, {
      data: JSON.stringify(payload),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getPath, postPath };
