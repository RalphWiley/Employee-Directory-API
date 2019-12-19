
const employeeList = document.querySelector('.grid-container');
const url = 'https://randomuser.me/api/?results=12&nat=GB,US,AU,FR,CA';
const search = document.getElementById('searchbar');

// Variable to store info for all 12 employees
// Variable to store info for all 12 employees
let employees = {};


// Function that fetches employees, url must point to randomuser API
function fetchEmployees(url) {
    return fetch(url)
        .then(data => data.json())
        .then(data => {
            employees = data.results; // stores employee data in 'employees' variable
            return data.results;
        })
        .then(data => generateEmployeeCards(data))
        .catch(err => console.error(`We're sorry, there was an error fetching your data: ${err.name}`));
}

fetchEmployees('https://randomuser.me/api/?results=12&nat=US'); // Call fetchEmployees on page load


// Function that generates employee card
function generateEmployeeCards(data) {
    data.forEach(person => employeeList.innerHTML += `
    <div class="employee-card">
        <div>
            <img class="employee-thumbnail" src="${person.picture.large}" alt="${person.name.first}'s profile picture">
        </div>
        <div>
            <h3 class="employee-name">${person.name.first} ${person.name.last}</h3>
            <p class="employee-email">${person.email}</p>
            <p class="employee-city">${person.location.city}</p>
        </div>
    </div>
    `);

    // Setting up event listener for each employee card, so that modal opens when clicked
    document.querySelectorAll('.employee-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            // code to call modal function will go here
            generateModal(employees, employees[index], index);
        });
    });
}


// Function to generate modal of clicked employee
const generateModal = (employees, employee, index) => {
    const modalContainer = document.querySelector('.modal-container');
    const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language); // Formats date depending on users locale.

    modalContainer.innerHTML = `
      <div class="modal">
        <div class="modal-info-container">
          <span class='modal-close-x'>x</span>
          <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first}'s profile picture">
          <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="modal-text">${employee.email}</p>
          <p class="modal-text cap"><span id='prev-btn'><</span><span class="city">${employee.location.city}</span><span id='next-btn'>></span></p><hr>
          <p class="modal-text">${employee.phone}</p>
          <p class="modal-text cap">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state} ${employee.location.postcode}</p>
          <p class="modal-text">Birthday: ${dob}</p>
        </div>
      </div>
    `;

    modalContainer.style.display = 'block';


    // Closes modal when 'x' is clicked
    const modalX = document.querySelector('.modal-close-x');

    modalX.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    })


    // Changes to previous or next employee when 'prev' or 'next' button is clicked
    const nextBtn = modalContainer.querySelector('#next-btn');
    const prevBtn = modalContainer.querySelector('#prev-btn');

    nextBtn.addEventListener('click', () => {
        generateModal(employees, employees[index + 1], index + 1);
    });

    prevBtn.addEventListener('click', () => {
        generateModal(employees, employees[index - 1], index - 1);
    });


    // 'Prev' button disappears when first employee is selected, 'Next' button disappears when last employee is selected.
    if (index == 0) {
        prevBtn.innerHTML = '';
        document.querySelector('.city').style.paddingLeft = '43px';
    } else if (index == employees.length - 1) {
        nextBtn.innerHTML = '';
        document.querySelector('.city').style.paddingRight = '43px';
    }
};

// search box

search.addEventListener('keyup', () => {
    const input = search.value.toUpperCase();
    let cards = employeeList.querySelectorAll('.employee-card');

    cards.forEach((person) => {
        const name = person.childNodes[3].childNodes[1].innerText.toUpperCase();

        if(!name.includes(input)){
            person.classList.add('hidden');
        } else {
            person.classList.remove('hidden');
        }
    })
})