const title = document.getElementById('title');
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
                <div class='text-container'>
                    <h3 class='info-detail'>${result.name.first} ${result.name.last}</h3>
                    <p class='info-detail'>${result.email}</p>
                    <p class='info-detail'>${result.location.city}</p>
                </div>
            </section>
        `
        index++;
        list.push(result);
        employeeList.innerHTML += html;
    });
}

function generateModal(index){
    const main = document.querySelector('main');
    const employee = list[index]; 
    // console.log(employee.dob.date.toLocaleString().substring(0, 10));
    let birthday = employee.dob.date.toLocaleString().substring(0, 10);
    const html = `
        <div class='modalContent'>
            <img class='modal-avatar' src='${employee.picture.large}' alt = 'profile-image'>
            <div class='modal-info'>
                <h3>${employee.name.first} ${employee.name.last}</h3>
                <p>${employee.email}</p>
                <p>${employee.location.city}</p>
                <hr style="border:none;">
                <p>${employee.cell}</p>
                <p>${employee.location.street.number} ${employee.location.street.name} ${employee.location.state} ${employee.location.postcode}</p>
                <p>Birthday: ${birthday}</p>
            </div>
        </div>
    `;
    main.appendChild(modal);
    closeBtn.innerHTML = '&times';
    myModal.innerHTML = html;
    modal.appendChild(myModal);
    modal.appendChild(closeBtn);
}
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

function getIndex(e) {
    if (e.target.className === 'card') {
        return e.target.getAttribute('index');
    } else if (e.target.parentNode.className === 'card') {
        return e.target.parentNode.getAttribute('index');
    }
}

function createModal(e) {
    const modal = document.querySelector('.modal');
    let personIndex = getIndex(e);
    generateModal(personIndex);
    return generateModal;
}

function openModal() {
    myModal.style.display = 'block';
    closeBtn.style.display = 'block';
}

function closeModal() {
    myModal.style.display = 'none';
    closeBtn.style.display = 'none';
}


function outsideClose(e) {
    if (e.target === myModal) {
        closeModal();
    }
}

// Events

employeeList.addEventListener('click', (e) => {
    if (e.target.className === 'card' || e.target.className === 'avatar' || e.target.className === 'info-detail') {
        createModal(e);
        openModal();
    }
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', outsideClose);

document.addEventListener('keydown', closeModal);
