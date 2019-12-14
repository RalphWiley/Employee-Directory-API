var people = fetch('https://randomuser.me/api/?results=5000')
    .then(res => res.json());

console.log(people);