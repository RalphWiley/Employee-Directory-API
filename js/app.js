const employeeList = document.querySelector('.grid-container');
const url = 'https://randomuser.me/api/?results=12';
const list = [];
let index = 0;
const modal = document.createElement('div');
const closeBtn = document.createElement('span');
const myModal = document.createElement('div');
modal.className = 'modal';
closeBtn.id = 'closeBtn';
myModal.className = 'my-modal';


fetch(url)
    .then(response => response.json())
    .then(data => {
        generateEmployees(data.results);
        console.log(data.results);
    })


function generateEmployees(data) {
    data.map(result => {
        const html = `
            <section class='card' index=${index}>
            <img class='avatar' src='${result.picture.large}' alt='profile-image'>
                <h3 class='info-detail'>${result.name.first} ${result.name.last}</h3>
                <p class='info-detail'>${result.email}</p>
                <p class='info-detail'>${result.location.city}</p>
            </section>
        `
        index++;
        list.push(result);
        employeeList.innerHTML += html;
    })
};
// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Looks like there was a problem!', error))
}

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// function generateCard() {
//     const div =`
//     <div class='card'></div>
//   `;
//   main.push(div);
   
// }

function generateImage(data) {
    const html = `
    <img src='${data}' alt>
    <p>Click to view images of ${select.value}s</p>
  `;
    card.innerHTML = html;
}

// function fetchEmployeeImage() {
//     const person = select.value;
//     const img = card.querySelector('img');

//     fetchData('')
//         .then(data => {
//             img.src = data.message;
//             img.alt = person;
//         })
    
// }