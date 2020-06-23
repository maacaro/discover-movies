export default function client(endpoint) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
    }
  };
  return fetch(`https://api.themoviedb.org/3/${endpoint}`, config).then(
    async response => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  );
}
