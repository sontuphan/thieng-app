import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import authentication from 'helpers/authentication';

function fetchQuery(operation, variables) {
  return fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authentication.getAuthHeader()
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(res => {
    return res.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;