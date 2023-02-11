let store = {
    user: { name: "RAWAN" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, apod } = state

    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                <section>
                  <button id="Curiosity" onclick="eventClick(event, getImageOfRover)">Curiosity</button>
                  <button id="Opportunity" onclick="eventClick(event, getImageOfRover)">Opportunity</button>
                  <button id="spirit" onclick="eventClick(event, getImageOfRover)">Spirit</button>
                </section>
                <section class="data">
                	${!store.apod.photos ? "" :
					displayRoverData(displayRoverObj, displayRoverImages)}
                </section>
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------  COMPONENTS
function eventClick(e, callBack){
  callBack(e.target.id);
}

function displayRoverData(cb1, cb2){
	return cb1() +  `<section class="images">${cb2()}</section>`;
}

function displayRoverObj(){
  const text = !store.apod.photos ? "" : store.apod.photos[0].rover;
  return `<section>
<p><bold> Landing Date: </bold> ${text.landing_date}</p>
	<p><bold> Launch Date: </bold> ${text.launch_date}</p>
	<p><bold> Name: </bold> ${text.name}</p>
	</section>`
}

function displayRoverImages(){
  const images = store.apod.photos?.map((photo) =>photo.img_src);
  return images?.map(image=> `<img src=${image} class="image"/>`).join("");
  //console.log(images);
}

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

// ---------------  API CALLS

// Example API call
//const getImageOfTheDay = (state) => {
//    let { apod } = state

//    fetch(`https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/apod`)
//        .then(res => res.json())
//        .then(apod => updateStore(store, { apod }))

//    return data
//}

const getImageOfRover = (rover) => {
  
    fetch(`https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/rovers/${rover}`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

}
