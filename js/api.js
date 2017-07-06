const SERVER_URL = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter`;
const USER_NAME = `id166811`;

export function loadData() {
  return fetch(`${SERVER_URL}/questions`)
    .then((resp) => {
      return resp.json();
    });
}

export function loadResults(userName = USER_NAME) {
  return fetch(`${SERVER_URL}/stats/${userName}`);
}

export function saveResults(data) {
  const requestSettings = {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': `application/json`
    },
    method: `POST`
  };
  return fetch(`${SERVER_URL}/stats/${USER_NAME}`, requestSettings);

}
