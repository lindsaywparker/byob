document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  fetchToken();
});

const fetchToken = () => {
  const email = document.getElementById('email-input').value;
  const appName = document.getElementById('app-input').value;
  fetch('/api/requestjwt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      appName,
    }),
  })
    .then(blob => blob.json())
    .then((response) => {
      document.querySelector('p').textContent = `${response.msg} \n ${response.token}`;
    });
};
