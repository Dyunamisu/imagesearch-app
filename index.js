const apiKey = `oVyFSjI8ADAJA74MF58x7YittGXe-4TEzSCHl35IKNA`;
const searchUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=`
const form = document.querySelector('#search-form');
const query = document.querySelector('#search-input')
const result = document.getElementById("result");

let page = 1;
let isSearching = false;

// try fetching json from api
// fetch(`https://api.unsplash.com/search/photos?client_id=oVyFSjI8ADAJA74MF58x7YittGXe-4TEzSCHl35IKNA&query=dog`)
//     .then(response => response.json())
//     .then(json => {
//         const imagePath = `<img src="${json.results[1].urls.small}">`
//         result.innerHTML += imagePath || "<p>no image</p>" ;
//     })

async function fetchData(url){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Network response failed!");
        }
        return await response.json();
    } catch(error){
        return null;
    }
}

async function fetchAndShowResult(url){
    const data = await fetchData(url);
    if(data && data.results){ //check empty
        showResults(data.results); 
    }
}

function createImageCard(item){
    const { urls } = item;
    const image = urls.small;
    const imageTemplate = `
    <div class="column">
        <div class="card">
            <img src="${image}" alt="Image cant be loaded" width="100%">
        </div>
    </div>`

    return imageTemplate;
}

function clearResults(){
    result.innerHTML="";
}

function showResults(items){
    const newContent = items.map(
        (item) => createImageCard(item)).join("");
        console.log(newContent);
    result.innerHTML += newContent || "<p>No image found</p>";
}

async function handleSearch(event){
    event.preventDefault();
    const searchTerm = query.value.trim(); 
    // trim whitespace
    if(searchTerm){  //check empty
        isSearching = true;
        clearResults();
        const newUrl = `${searchUrl}${searchTerm}`;
        await fetchAndShowResult(newUrl);
        query.value = "";
    }
}

form.addEventListener('submit',handleSearch);

// async function init(){
//     clearResults();
//     const url = `https://api.unsplash.com/photos/?client_id=${apiKey}`;
//     await fetchAndShowResult(url);
// }

// init();
