const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName('main')[0]
const fetchTrainers = () => {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(data =>{
    getTrainerName(data)
  })
}

//HELPER: Function to create a card with the trainers data
const createCard = (trainerData) => {
  newCard = document.createElement('div')
  newCard.classList.add('card')
  newCard.setAttribute('data-id', trainerData.id)
  nameParagraph = document.createElement('p')
  nameParagraph.innerText = trainerData.name
  button2 = document.createElement('button')
  button2.setAttribute('data-trainer-id',trainerData.id)
  button2.innerText = 'Add Pokemon'

  newCard.appendChild(nameParagraph).appendChild(button2)
  main.appendChild(newCard)
  pokeCard = createPokemon(trainerData.pokemons)
  newCard.appendChild(pokeCard)

    button2.addEventListener('click',(event)=>{
      // console.log(event.target)
      console.log(button2)
      // console.log('hi')
      fetchNewPoke(trainerData.pokemons)
    })
}


//add a new pokemon to the trainers card
const fetchNewPoke = (pokemonArray)=>{
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify({'trainer_id': pokemonArray[0].trainer_id})
  })
  .then(resp => resp.json())
  .then(data => addPokeToList(data))
}

const addPokeToList = (data) => {
  parentTrainer = document.querySelector(`[data-id='${data.trainer_id}']`)
  parentList = parentTrainer.getElementsByTagName('ul')[0]
  newListItem = newPokeLi(data)
  parentList.appendChild(newListItem)
}


//create a single poke within trainer card
const newPokeLi = (pokemon) =>{
  newPoke = document.createElement('li')
  newPoke.innerText = `${pokemon["nickname"]} (${pokemon.species})`
  button = document.createElement('button')
  button.classList.add('release')
  button.setAttribute('data-pokemon-id',pokemon.id)
  button.innerText = 'Release'
  newPoke.appendChild(button)
  button.addEventListener('click', (event)=>{
    event.currentTarget.parentNode.remove()
    fetch(POKEMONS_URL +`/${pokemon.id}`,{
      method: 'DELETE'
    })
  })
  return newPoke
}

//create list items for each pokemon that belongs to trainer with a button that can delete each pokemon when clicked
const createPokemon = (pokemonArray) =>{
  console.log(pokemonArray)
  list = document.createElement('ul')
  pokemonArray.forEach((pokemon)=>{
    pokeList = newPokeLi(pokemon)
    list.appendChild(pokeList)
  })
  return list
}
//
const getTrainerName = (data) =>{
  data.forEach((trainer) => {
    createCard(trainer)
  })
}

fetchTrainers();
