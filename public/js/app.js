const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('location');
const messageTwo = document.getElementById('error');

const forecast = weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Searching ...';
    messageTwo.textContent = '';

    fetch('/weather/?adress=' + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location.toUpperCase() + " :";
                    messageTwo.textContent = data.forecastInfo;
                }
            });
        })
        .catch(error => {
            messageOne.textContent = error;
        });
    console.log(search.value);
});

