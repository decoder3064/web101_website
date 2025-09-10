

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
        fetch(`https://entre-runners-production.up.railway.app/api/contact`, {
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
    }
}


window.addEventListener('scroll',initCarousel)





// Test API Connection
nextTrainings = document.getElementById('header-button');

nextTrainings.addEventListener('click',() => {
    window.open('https://docs.google.com/spreadsheets/d/1KfJ8qpCIJ0e-zB9wlG2dP92Y_cxHrBOHhmBVqD-JH1c/edit?usp=sharing', '_blank');
});


//Load images to gallery
const loadGallery = () =>{
    fetch(`https://entre-runners-production.up.railway.app/api/gallery-images`).then(response =>{
        if(response.ok){
            return response.json()
        }
        else{return `Images are not working`}
    }).then(data =>{
        updateGalleryHTML(data.images); 
        initGalCarousel(data.images)
        }
    )};

// Replace your existing initGalCarousel function with this improved version

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
    
    // Get actual page width without gap for proper positioning
    const getActualPageWidth = () => {
        if (window.innerWidth <= 480) {
            return 300;
        } else if (window.innerWidth <= 767) {
            return 350;
        } else {
            return 1200;
        }
    };
    
    // Get gap size
    const getGap = () => {
        return 50; // Consistent 50px gap
    };
    
    const totalPages = Math.ceil(images.length / 8);

    const createDots = () => {
        dotsContainer.innerHTML = '';
        for(let i = 0; i < totalPages; i++){
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            if(i === 0){
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                moveToPage(i);
            });

            dotsContainer.appendChild(dot);
        }
    };

    const updateDots = () => {
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            if(index === currentPage){
                dot.classList.add('active');
            } else{
                dot.classList.remove('active');
            }
        });
    };

    const moveToPage = (pageNumber) => {
        let moveDistance = 0;
        
        if (pageNumber > 0) {
            const viewport = document.getElementById('gallery-viewport');
            const viewportWidth = viewport.offsetWidth;
            
            // Check if we're on mobile or desktop
            if (window.innerWidth <= 767) {
                // Mobile: no gap, just move by viewport width
                moveDistance = pageNumber * viewportWidth;
            } else {
                // Desktop: include 50px gap
                moveDistance = pageNumber * (viewportWidth + 50);
            }
        }
        
        // Ensure we don't go beyond available pages
        if (pageNumber < 0) pageNumber = 0;
        if (pageNumber >= totalPages) pageNumber = totalPages - 1;
        
        track.style.transform = `translateX(-${moveDistance}px)`;
        currentPage = pageNumber;

        // Update button states
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
        
        // Add visual feedback for disabled buttons
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
        
        updateDots();
    };

    // Next button event listener
    nextBtn.addEventListener('click', () => {
        if(currentPage < totalPages - 1){
            currentPage++;
            moveToPage(currentPage);
        }
    });

    // Previous button event listener
    prevBtn.addEventListener('click', () => {
        if(currentPage > 0){
            currentPage--;
            moveToPage(currentPage);
        }
    });

    // Handle window resize to recalculate positions
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            moveToPage(currentPage); // Recalculate position on resize
        }, 250);
    });

    // Initialize
    createDots();
    moveToPage(0);
};

// Also update your updateGalleryHTML function to ensure proper structure
const updateGalleryHTML = (images) => {
    const track = document.getElementById('gallery-track');
    track.innerHTML = '';
    
    // Calculate total pages needed
    const imagesPerPage = 8;
    const totalPages = Math.ceil(images.length / imagesPerPage);
    
    for(let page = 0; page < totalPages; page++){
        const newLi = document.createElement('li');
        newLi.id = 'gallery-page';
        
        // Calculate start and end indices for this page
        const startIndex = page * imagesPerPage;
        const endIndex = Math.min(startIndex + imagesPerPage, images.length);
        
        // Add images to this page
        for(let i = startIndex; i < endIndex; i++){
            const img = document.createElement('img');
            img.src = images[i].url;
            img.classList.add('gallery-item');
            img.alt = `Gallery image ${i + 1}`;
            
            // Add error handling for broken images
            img.onerror = function() {
                console.warn(`Failed to load image: ${this.src}`);
                this.style.display = 'none';
            };
            
            newLi.appendChild(img);
        }
        
        track.appendChild(newLi);
    }
};



document.addEventListener('DOMContentLoaded', loadGallery);

//Count Down 
// Training schedule data
// Training schedule data
const trainingSchedule = {
    tuesday: {
        time: 19 * 60 + 30,  // 7:30 PM
        location: "Millennium Plaza",
        address: "P.º Gral. Escalón 3675, San Salvador, El Salvador",
        lat: 13.6925,
        lng: -89.2310
    },
    wednesday: {
        time: 19 * 60 + 30,  // 7:30 PM
        location: "Las Cascadas",
        address: "C. El Pedregal, Cd Merliot, El Salvador",
        lat: 13.6687,
        lng: -89.2578
    },
    thursday: {
        time: 19 * 60 + 30,  // 7:30 PM
        location: "Plaza Presidente",
        address: "Av. De La Revolución, San Salvador, El Salvador",
        lat: 13.7025,
        lng: -89.2137
    },
    saturday: {
        time: 6 * 60 + 0,    // 6:00 AM
        location: "Multiplaza",
        address: "Carr. Panamericana, San Salvador, El Salvador",
        lat: 13.6589,
        lng: -89.2656
    }
};

 const dayNameToNumber = {
        'sunday': 0, 'monday': 1, 'tuesday': 2, 
        'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6
    };

const getNextTraining = (now) => {
    const currentTime = now.getHours() * 60 + now.getMinutes(); 

     const dayNames = [
        'sunday', 'monday', 'tuesday', 
        'wednesday', 'thursday', 'friday', 'saturday'
     ];

     const todayName = dayNames[now.getDay()];


    if (trainingSchedule[todayName]){
        const trainingTime = trainingSchedule[todayName].time;
        if(currentTime < trainingTime){
            console.log(todayName)
            return {day: todayName, ...trainingSchedule[todayName]};
        }
    };

    for (let i = 1; i <= 7; i++){
        const nextDayI = (now.getDay() + i) % 7;
        const nextDayName = dayNames[nextDayI];

        if (trainingSchedule[nextDayName]){
            console.log(nextDayName)
            return { day: nextDayName, ...trainingSchedule[nextDayName]}; 
        }
    };

    return{day:dayNames[2], ...trainingSchedule[dayNames[2]]};
};



 function minutesToTimeString(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}


const calculateTimeRemaining = (nextDay, today) => {

    const todayDayNumber = today.getDay();
    const targetNumber = dayNameToNumber[nextDay.day];

     let toAdd;

     if(targetNumber > todayDayNumber){
        toAdd = targetNumber-todayDayNumber;
     }else if(targetNumber < todayDayNumber){
        toAdd = (7 - todayDayNumber) + targetNumber;
     }
     else{
        toAdd = 7;
     }

     const targetDate = new Date(today);
     targetDate.setDate(today.getDate() + toAdd);

     const trainingHours = Math.floor(nextDay.time / 60);
     const trainingMinutes = nextDay.time % 60;
     targetDate.setHours(trainingHours,trainingMinutes, 0, 0);

    const timeDifference = targetDate.getTime() - today.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes, targetDate};
};




const updateCountdownDisplay = () => {

     const now = new Date(new Date().toLocaleString("en-US", {
        timeZone: "America/El_Salvador"
    }));
    
    const nextTraining = getNextTraining(now);
    const timeLeft = calculateTimeRemaining(nextTraining, now);
    
    document.getElementById('days').textContent = timeLeft.days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = timeLeft.hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = timeLeft.minutes.toString().padStart(2, '0');
    
    updateEventDisplay(nextTraining,timeLeft)
    updateMapIfChanged(nextTraining);
};

let currentTrainingLocation = null;

const updateMapIfChanged = (training) => {
    if (currentTrainingLocation !== training.location) {
        updateMap(training.lat, training.lng, training.location);
        updateMapButtons(training);
        currentTrainingLocation = training.location;
    }
};


const updateEventDisplay = (training, timeLeft) => {
    const eventDate = timeLeft.targetDate;
    
    // Format date as "03 JUL"
    const day = eventDate.getDate().toString().padStart(2, '0');
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    
    // Convert to 12-hour format
    const hour = Math.floor(training.time / 60);
    const minute = training.time % 60;
    let timeString;
    
    if (hour === 0) {
        timeString = minute === 0 ? "12AM" : `12:${minute.toString().padStart(2, '0')}AM`;
    } else if (hour < 12) {

        timeString = minute === 0 ? `${hour}AM` : `${hour}:${minute.toString().padStart(2, '0')}AM`;
    } else if (hour === 12) {

        timeString = minute === 0 ? "12PM" : `12:${minute.toString().padStart(2, '0')}PM`;
    } else {

        const hour12 = hour - 12;
        timeString = minute === 0 ? `${hour12}PM` : `${hour12}:${minute.toString().padStart(2, '0')}PM`;
    }
    

    const locationParts = training.location.toUpperCase().split(' ');
    let locationDisplay;
    
    if (locationParts.length >= 2) {
        locationDisplay = `${timeString}<br>${locationParts.join('<br>')}`;
    } else {
        locationDisplay = `${timeString}<br>${locationParts[0]}`;
    }
    

    document.getElementById('event-display').innerHTML = `${day}<br>${month}`;
    document.getElementById('location-display').innerHTML = locationDisplay;
    

    updateMapIfChanged(training);
    updateCalendarButton(training, timeLeft);
};

const addToCalendar = (training, targetDate) => {
    // Format date for calendar (YYYYMMDDTHHMMSS)
    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    const day = targetDate.getDate().toString().padStart(2, '0');
    const hour = targetDate.getHours().toString().padStart(2, '0');
    const minute = targetDate.getMinutes().toString().padStart(2, '0');
    
    const startDate = `${year}${month}${day}T${hour}${minute}00`;
    
    const endTime = new Date(targetDate.getTime() + 60 * 60 * 1000);
    const endYear = endTime.getFullYear();
    const endMonth = (endTime.getMonth() + 1).toString().padStart(2, '0');
    const endDay = endTime.getDate().toString().padStart(2, '0');
    const endHour = endTime.getHours().toString().padStart(2, '0');
    const endMinute = endTime.getMinutes().toString().padStart(2, '0');
    
    const endDate = `${endYear}${endMonth}${endDay}T${endHour}${endMinute}00`;
    
    // Create Google Calendar URL
    const title = `Entrenamiento Entre Runners - ${training.location}`;
    const details = `Entrenamiento grupal de running en ${training.location}`;
    const location = training.address;
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    window.open(calendarUrl, '_blank');
};



const updateCalendarButton = (training, timeLeft) => {
    const calendarBtn = document.getElementById('calendar-button');
    calendarBtn.onclick = () => addToCalendar(training, timeLeft.targetDate);
};


const updateMap = (lat, lng, locationName) => {
    const mapContainer = document.querySelector('.map-preview');
    
    // Create a cleaner map design similar to PDF
    mapContainer.innerHTML = `
        <div style="
            width: 100%; 
            height: 100%; 
            border-radius: 15px; 
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            position: relative;
            overflow: hidden;
        ">
            <iframe 
                width="100%" 
                height="100%" 
                frameborder="0" 
                style="border: none; border-radius: 15px;"
                src="https://maps.google.com/maps?q=${lat},${lng}&t=m&z=15&output=embed&iwloc=addr=&z=15"
                title="Map of ${locationName}">
            </iframe>
            <div style="
                position: absolute;
                top: 10px;
                left: 10px;
                background: rgba(255,255,255,0.9);
                padding: 8px 12px;
                border-radius: 8px;
                font-family: 'Montserrat', sans-serif;
                font-size: 12px;
                font-weight: 600;
                color: #333;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            ">
                📍 ${locationName}
            </div>
        </div>
    `;
};

const updateMapButtons = (training) => {

    const wazeBtn = document.getElementById("waze"); // First button (ABRIR EN WAZE)
    const mapsBtn = document.getElementById("maps"); // Second button (ABRIR EN MAPS)
    
    if (wazeBtn) {
        wazeBtn.onclick = () => openInWaze(training.lat, training.lng);
    }
    if (mapsBtn) {
        mapsBtn.onclick = () => openInGoogleMaps(training.lat, training.lng);
    }
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

document.addEventListener('DOMContentLoaded', startCountdown); 






