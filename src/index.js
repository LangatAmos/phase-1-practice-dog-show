document.addEventListener('DOMContentLoaded', () => {

    
    document.addEventListener("click", (event) =>{
        event.preventDefault()
        if(event.target.id === "edit-btn"){
        editDog(event.target.dataset.id)
    } else if(event.target.parentElement.id === 'dog-form'){
        updated(event)
    }
    })
    
    
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(dogs => dogs.forEach(getDog))
    
    const tableBody = document.getElementById('table-body')
    function getDog(dog){
        console.log(dog)
        tableBody.innerHTML += 
        `<tr data-id=${dog.id}>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id="edit-btn" data-id=${dog.id}>Edit</button></td>
        </tr>`
    }
    
    function updated(event){
    fetch(`${"http://localhost:3000/dogs"}/${event.target.parentElement.dataset.id}`, {
        method: 'PATCH',
        headers: {
            "content-type": 'application/json',
            accepts: 'application/json'
        },
        body: JSON.stringify({
            name: event.target.parentElement.name.value,
            sex: event.target.parentElement.sex.value,
            breed: event.target.parentElement.breed.value
        })
    }).then(res => res.json())
    .then(dog => {
        let foundDog = document.querySelector(`tr[data-id="${dog.id}"]`)
        foundDog.children[0].innerText = dog.name
        foundDog.children[1].innerText = dog.breed
        foundDog.children[2].innerText = dog.sex
    })
    }

    const dogForm = document.getElementById('dog-form')

    function editDog(id){
        fetch(`${"http://localhost:3000/dogs"}/${id}`)
        .then(res => res.json())
        .then(dog => {
        dogForm.name.value = dog.name,
        dogForm.sex.value = dog.sex,
        dogForm.breed.value = dog.breed,
        dogForm.dataset.id = dog.id
    })
    
    }
})