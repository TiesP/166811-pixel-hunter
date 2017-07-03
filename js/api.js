const SERVER_URL = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter`;

export function loadData() {
  return fetch(`${SERVER_URL}/questions`)
    .then((resp) => {
      return resp.json();
    });
}

export function loadResults() {
  return fetch(`${SERVER_URL}/stats/id166811`)
    .then((resp) => {
      return resp.json();
    });
}

export function saveResults(data) {
  const requestSettings = {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': `application/json`
    },
    method: `POST`
  };
  return fetch(`${SERVER_URL}/stats/id166811`, requestSettings);

}
