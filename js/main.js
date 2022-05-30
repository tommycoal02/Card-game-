// global variable
let deckId = ''

const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      deckId = data.deck_id
    })
    .catch(err => {
        console.log(`error ${err}`)
    }); 


    // fetch('https://deckofcardsapi.com/api/deck/deckId/pile/<<pile_name>>/list/')

document.querySelector('button').addEventListener('click', getFetch)
function getFetch(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)

      document.querySelector('#player1').src= data.cards[0].image
      document.querySelector('#player2').src= data.cards[1].image
      // document.querySelector('#remainingCard').src= data.remaining.image

      let player1Val = valueConverterToNum(data.cards[0].value)
      let player2Val = valueConverterToNum(data.cards[1].value)

      if(player1Val > player2Val){
        document.querySelector('h3').innerText = "player 1 wins"
      }else if(player1Val < player2Val){
        document.querySelector('h3').innerText = "player 2 wins"
      }
      else(document.querySelector('h3').innerText = "This Is War")
      
    })
    .catch(err => {
        console.log(`error ${err}`)
    }); 
}

function valueConverterToNum(val){
  if(val === "ACE"){
    return 14
  }else if(val === "KING"){
    return 13
  }else if(val === "QUEEN"){
    return 12
  }else if( val === "JACK"){
    return 11
  }else{
    return Number(val)
  } 
}

// function noMoreCard(){
  
//   if(data.success=== "true")
//   console.log("game onnnn")
// }

document.querySelector('#reshuffleButton').addEventListener('click', reshuffleDeck)
function reshuffleDeck(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
    })
    .catch(err => {
        console.log(`error ${err}`)
    }); 
}

