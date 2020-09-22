function main(){
    quotes()
    createQuote()
    deleteQuote()
    addLike()
}
const quotesUl = document.querySelector('#quote-list')
const form = document.querySelector('#new-quote-form')
const delBtn = document.querySelector('.btn-danger')

function quotes(){
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(resp => resp.json())
    .then(quotes => {
        quotes.forEach(function(quote){
            quotesUl.innerHTML += 
           ` <li class='quote-card'>
            <blockquote class="blockquote">
              <p class="mb-0">${quote.quote}</p>
              <footer class="blockquote-footer">${quote.author}</footer>
              <br>
              <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
              <button class='btn-danger' data-id='${quote.id}'>Delete</button>
            </blockquote>
          </li>`
        })
    }) 
}

function createQuote(){
    form.addEventListener("submit", function(e){
      const newQuote = e.target[0].value
      const newAuthor = e.target[1].value
      const newQuoteObj = {
          quote: newQuote,
          author: newAuthor
      }
      const reqObj = {
          method: "POST", 
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newQuoteObj) 
      }
      fetch("http://localhost:3000/quotes", reqObj)
      .then(resp => resp.json())
      .then(quote => {
        quotesUl.innerHTML += 
           `<li class='quote-card' data-id='${quote.id}'>
            <blockquote class="blockquote">
              <p class="mb-0">${quote.quote}</p>
              <footer class="blockquote-footer">${quote.author}</footer>
              <br>
              <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
              <button class='btn-danger'>Delete</button>
            </blockquote>
           </li>`
      }) 
    })
}

function deleteQuote(){
    quotesUl.addEventListener('click', function(event){
        const quoteId = event.target.dataset.id 
        if (event.target.className === 'btn-danger'){ 
            fetch(`http://localhost:3000/quotes/${quoteId}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(() => {
                event.target.parentNode.parentNode.remove()
            })
        }
    })
}

function addLike(){
    quotesUl.addEventListener('click', function(event){
        const quoteId = event.target.dataset.id 
        if (event.target.className === 'btn-success'){
            const newLike = {
                quoteId: quoteId,
                createdAt: Date.now()
            }
            const reqObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLike)
            }
        
            fetch('http://localhost:3000/likes', reqObj)
            .then(resp => resp.json())
            .then(like => {
                
            }) 
        }
    }) 
}

main()