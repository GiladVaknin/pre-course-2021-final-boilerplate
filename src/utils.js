const API_KEY = "$2b$10$RQqz/qgf6iN04LR5YYiIFuczpRHS.l/gqQlZrPb5L7Lx63TGOr0QC"; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";
const url = "https://api.jsonbin.io/v3/b/602a8af9f460fe73a196fdef";

// Gets data from persistent storage by the given key and returns it
function getPersistent(key) {
  let promiseFetch = fetch(url + "/latest", {
    headers: {
      "X-MASTER-KEY": key,
      "Content-Type": "application/json",
    },
  });
  return promiseFetch.then((response) => {
    return response.json();
  });
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(key, data) {
  const promise = fetch(url, {
    method: "PUT",
    headers: {
      "X-MASTER-KEY": key,
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ "my-todo": data }),
  });
  promise.then(() => {
    return true;
  });
}
