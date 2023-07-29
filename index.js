const apiKey = `oVyFSjI8ADAJA74MF58x7YittGXe-4TEzSCHl35IKNA`;
const searchUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=`
const form = document.querySelector('#search-form');
const query = document.querySelector('#search-input')
const result = document.getElementById("result");

let page = 1;
let isSearching = false;

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
    else{
        showResults(data);
    }
}

function createImageCard(item){
    const { urls } = item;
    const image = urls.small;
    const imageTemplate = `
    <div class="column">
        <div class="card">
            <a href="${image}">
                <img src="${image}" alt="Image cant be loaded" width="100%">
            </a>
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
function detectEnd(){
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20){
        loadMoreResults();
    }
}
async function loadMoreResults(){
    if(isSearching){
        return;
    }
    page++;
    const url = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`
    await fetchAndShowResult(url);
}

form.addEventListener('submit',handleSearch);
window.addEventListener('scroll', detectEnd);
window.addEventListener('resize', detectEnd);

async function init(){
    clearResults();
    const url = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
    await fetchAndShowResult(url);
}

init();
