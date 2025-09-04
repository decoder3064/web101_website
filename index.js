

/*** Form Handling [PLACEHOLDER] [ADDED IN UNIT 6] ***/
/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
const button = document.getElementById('rsvp-b');



// Step 2: Write the callback function
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;

  var rsvpInputs = document.getElementById("rsvp-form").elements;

   let person = {
    name: rsvpInputs[0],
    email: rsvpInputs[1],
    message: rsvpInputs[2]
   };
   // Loop through all inputs
    for(const key in person){
        const input = person[key];
        if (input.value.trim().length < 2){
            containsErrors = true;
            input.classList.add('error');
        }
        else{
            input.classList.remove('error');
        }  
    }

    // Comprehensive email validation
    const email = person["email"];
    const emailValue = email.value.trim();

    // Check if email has @ symbol
    if (!emailValue.includes("@")) {
        containsErrors = true;
        email.classList.add('error');
    }
    // Check if email has a domain (dot followed by letters)
    else if (!emailValue.match(/\.[a-zA-Z]{2,}$/)) {
        containsErrors = true;
        email.classList.add('error');
    }

    else if (emailValue.indexOf("@") === 0 || emailValue.indexOf("@") === emailValue.length - 1) {
        containsErrors = true;
        email.classList.add('error');
    }
    // Check for multiple @ symbols
    else if ((emailValue.match(/@/g) || []).length !== 1) {
        containsErrors = true;
        email.classList.add('error');
    }
    else {
        email.classList.remove('error');
    }

    if(!containsErrors){
        fetch(`http://localhost:3000/api/contact`, {
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: person.name.value,
                email: person.email.value, 
                message: person.message.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                toggleModal(person);
                for(const entry in person){
                    person[entry].value = "";
                }
            }
            else{
                console.error('Server error:', data.message);
                alert('Failed to send email: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Network error:', error);
            alert('Network error. Please try again.');
        });
    }
}

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
button.addEventListener('click', validateForm);


/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/
/*** Success Modal [PLACEHOLDER] [ADDED IN UNIT 9] ***/
/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

const toggleModal = (person) => {
    let modal = document.getElementById("success-modal"); // TODO
    let modalContent = document.getElementById('modal-text');
    
    // TODO: Update modal display to flex
    modal.style.display = "flex";
    // TODO: Update modal text to personalized message
     modalContent.textContent = `🎉 ¡Gracias, ${person.name.value}! Hemos recibido tu mensaje y te contactaremos pronto a ${person.email.value}.`;



    // Set modal timeout to 5 seconds
    let intervalId =setInterval(animateImage, 500);
    setTimeout(() => {modal.style.display = "none";clearInterval(intervalId)}, 5000);
    
    
}

// TODO: animation variables and animateImage() function
let rotateFactor = 0;
const modalImage = document.getElementById("modal-img")

const animateImage = () =>{
    if (rotateFactor === 0){rotateFactor = -10;}   
    else {rotateFactor = 0;}

    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}


const initCarousel =() =>{
    const carItems = document.getElementById('car-items');
    const scroll = window.scrollY;
    const rect = carItems.getBoundingClientRect();

    const carouselOffsetTop = carItems.offsetTop; // Fixed position from top of document
    const moveDistance = Math.abs(scroll - carouselOffsetTop)/2;



    if (rect.top < window.innerHeight) {
        carItems.style.transform = `translateX(-${moveDistance}px)`;
        console.log("Moving by:", moveDistance);
    }
}


window.addEventListener('scroll',initCarousel)





// Test API Connection
apiTestButton = document.getElementById('header-button');

apiTestButton.addEventListener('click',() => {
    fetch(`http://localhost:3000/api/test`).then(response =>{
        if(response.ok){
            return response.json();
        }
        else{return `Naur bro this aint working`};
    }).then(data => console.log(data));
});


//Load images to gallery
const loadGallery = () =>{
    fetch(`http://localhost:3000/api/gallery-images`).then(response =>{
        if(response.ok){
            return response.json()
        }
        else{return `Images are not working`}
    }).then(data =>{
        updateGalleryHTML(data.images); 
        initGalCarousel(data.images)
        }
    )};


const updateGalleryHTML = (images) =>{
    let counter = 0; 
    const track = document.getElementById('gallery-track');
    track.innerHTML = '';
    newLi = null;

    for(let i = 0; i < images.length; i++){
        if(i % 8 === 0){
            newLi = document.createElement('li');
            newLi.id = 'gallery-page';
            track.appendChild(newLi);
        }
        let img = document.createElement('img');
        img.src = images[i].url;
        img.classList.add('gallery-item');
        newLi.appendChild(img);
    }

};


const initGalCarousel = (images) => {
    const track = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsContainer = document.getElementById('paginationDots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) {
    console.error('Required DOM elements not found');
    return;
    }

    let currentPage = 0;
    const pageWidth = 1250;
    const totalPages = Math.ceil(images.length / 8);

    const createDots = () =>{
        dotsContainer.innerHTML = '';
        for(let i=0; i<totalPages;i++){
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            if(i === 0){dot.classList.add('active');}
            
            dot.addEventListener('click',() => {
                moveToPage(i);
            });

            dotsContainer.appendChild(dot);
        }
    };


    const updateDots = () =>{
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot,index)=>{
            if(index === currentPage){
                dot.classList.add('active');
            } else{
                dot.classList.remove('active');
            }
        });
    };

    const moveToPage =(pageNumber)=>{
        const moveDistance = pageNumber * pageWidth;
        track.style.transform = `translateX(-${moveDistance}px)`;
        currentPage = pageNumber;

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages -1;
        updateDots();
    };

    nextBtn.addEventListener('click', () =>{
        if(currentPage < totalPages - 1){
            currentPage++;
            moveToPage(currentPage);
        }
    });

    prevBtn.addEventListener('click', () =>{
        if(currentPage > 0){
            currentPage--;
            moveToPage(currentPage);
        }
    });

    createDots();
    moveToPage(0);

}
    
document.addEventListener('DOMContentLoaded', loadGallery);

//Count Down 
// Training schedule data
const trainingSchedule = {
    tuesday: { 
        time: "19:30", 
        location: "Millennium Plaza",
        address: "Millennium Plaza, San Salvador",
        lat: 13.7083,
        lng: -89.2073
    },
    wednesday: { 
        time: "19:30", 
        location: "Las Cascadas",
        address: "Las Cascadas, Antiguo Cuscatlán", 
        lat: 13.6687,
        lng: -89.2578
    },
    thursday: { 
        time: "19:30", 
        location: "Plaza Presidente",
        address: "Plaza Presidente, San Salvador",
        lat: 13.7025,
        lng: -89.2137
    },
    saturday: { 
        time: "06:00", 
        location: "Multiplaza",
        address: "Multiplaza, Escalón",
        lat: 13.7067,
        lng: -89.2323
    }
};

const getNextTraining = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const trainingDays = [2, 3, 4, 6]; // Tue, Wed, Thu, Sat
    
    for (let i = 0; i < trainingDays.length; i++) {
        const trainingDay = trainingDays[i];
        
        if (dayOfWeek < trainingDay) {
            return trainingDay;
        } 
        else if (dayOfWeek === trainingDay) {
            const trainingHour = trainingDay === 6 ? 6 : 19;
            const trainingMinute = trainingDay === 6 ? 0 : 30;
            
            if (currentHour < trainingHour || (currentHour === trainingHour && currentMinute < trainingMinute)) {
                return trainingDay;
            }
        }
    }
    
    return 2; // Next Tuesday
};

const calculateTimeRemaining = (nextDay) => {
    const now = new Date();
    const nextTraining = new Date();
    
    // Set to next occurrence of the training day
    const daysUntilTraining = (nextDay - now.getDay() + 7) % 7;
    nextTraining.setDate(now.getDate() + (daysUntilTraining === 0 ? 7 : daysUntilTraining));
    
    // Set training time
    if (nextDay === 6) {
        nextTraining.setHours(6, 0, 0, 0); // Saturday 6:00 AM
    } else {
        nextTraining.setHours(19, 30, 0, 0); // Other days 7:30 PM
    }
    
    // If it's the same day and time hasn't passed, don't add a week
    if (daysUntilTraining === 0) {
        nextTraining.setDate(now.getDate());
    }
    
    const timeDiff = nextTraining.getTime() - now.getTime();
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
};

let currentLocation = null;

const updateCountdownDisplay = () => {
    const nextDay = getNextTraining();
    const dayToLocation = {
        2: 'tuesday',
        3: 'wednesday', 
        4: 'thursday',
        6: 'saturday'
    };
    
    const locationKey = dayToLocation[nextDay];
    const trainingInfo = trainingSchedule[locationKey];
    const timeRemaining = calculateTimeRemaining(nextDay);
    
    // Update countdown (these change every second)
    document.getElementById('countdown-days').textContent = timeRemaining.days;
    document.getElementById('countdown-hours').textContent = timeRemaining.hours;
    document.getElementById('countdown-minutes').textContent = timeRemaining.minutes;
    document.getElementById('countdown-seconds').textContent = timeRemaining.seconds;
    
    // Only update location info and map if location changed
    if (currentLocation !== locationKey) {
        currentLocation = locationKey;
        
        document.getElementById('training-location').textContent = trainingInfo.location;
        document.getElementById('training-address').textContent = trainingInfo.address;
        document.getElementById('training-time').textContent = trainingInfo.time;
        
        updateMap(trainingInfo.lat, trainingInfo.lng, trainingInfo.location);
    }
};

const updateMap = (lat, lng, locationName) => {
    const mapContainer = document.getElementById('training-map');
    mapContainer.innerHTML = `
        <iframe 
            width="100%" 
            height="300" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0" 
            src="https://maps.google.com/maps?width=100%25&height=300&hl=en&q=${lat},${lng}&t=&z=14&ie=UTF8&iwloc=&output=embed">
        </iframe>
        <div class="map-buttons">
            <button onclick="openInWaze(${lat}, ${lng})" class="nav-button">Open in Waze</button>
            <button onclick="openInGoogleMaps(${lat}, ${lng})" class="nav-button">Open in Google Maps</button>
        </div>
    `;
};

const openInWaze = (lat, lng) => {
    window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
};

const openInGoogleMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
};

// Start the countdown
const startCountdown = () => {
    updateCountdownDisplay();
    setInterval(updateCountdownDisplay, 1000);
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', startCountdown);




