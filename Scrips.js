document.getElementById('getAllCharacters').addEventListener('click', getAllCharacters);
document.getElementById('filterForm').addEventListener('submit', filterCharacters);

function getAllCharacters() {
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => displayCharacters(data.results))
        .catch(error => displayError(error));
}

function filterCharacters(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const species = document.getElementById('species').value;
    const type = document.getElementById('type').value;
    const gender = document.getElementById('gender').value;

    const url = new URL('https://rickandmortyapi.com/api/character');
    if (name) url.searchParams.append('name', name);
    if (status) url.searchParams.append('status', status);
    if (species) url.searchParams.append('species', species);
    if (type) url.searchParams.append('type', type);
    if (gender) url.searchParams.append('gender', gender);

    fetch(url)
        .then(response => response.json())
        .then(data => displayCharacters(data.results))
        .catch(error => displayError(error));
}

function displayCharacters(characters) {
    const output = document.getElementById('output');
    output.innerHTML = '';
    if (characters.length === 0) {
        output.innerHTML = '<p>No characters found.</p>';
        return;
    }
    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.innerHTML = `
            <h3>${character.name}</h3>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
            <p>Origin: ${character.origin.name}</p>
            <img src="${character.image}" alt="${character.name}">
        `;
        output.appendChild(characterDiv);
    });
}

function displayError(error) {
    const output = document.getElementById('output');
    output.innerHTML = `<p>Error: ${error.message}</p>`;
}
