import axios from 'axios';

const Calls = {
  Post: (data) =>
    axios
      .post(data.url, data.body, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((resp) => resp.data)
      .catch((err) => err),

  Get: (data) =>
    axios
      .get(data.url, data.params)
      .then((resp) => resp)
      .catch((err) => err),

  PUT: (data) =>
    axios
      .put(data.url, data?.body, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((resp) => resp)
      .catch((err) => err),
};

export default Calls;
