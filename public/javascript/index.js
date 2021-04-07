const form = document.getElementById('add-favor');
const ul = document.getElementById('favors');

const appendFavor = (favor) => {
    const li = document.createElement('li');
    li.textContent = `${favor.favor} - ${favor.quantity} - ${favor.contributor}`;
    ul.appendChild(li);
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fd = new FormData(form);

fetch('/api/v1/favors', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        favor: fd.get('favor'),
        quantity: fd.get('quantity'),
        contributor: fd.get('contributor'),
}),
})
    .then((res) => res.json())
    .then(appendFavor);
});

fetch('/api/v1/favors')
  .then((res) => res.json())
  .then((favors) => {
    favors.forEach(appendFavor);
  });