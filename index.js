/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/


// Step 1: Select the theme button
const themeButton = document.getElementById("theme-button")

// Step 2: Write the callback function
const toggleLightMode = () => {
    // Write your code here
    document.body.classList.toggle('light-mode');
    
    // This section will run whenever the button is clicked
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener('click', toggleLightMode)


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


const addParticipant = (person) => {
    // Step 2: Write your code to manipulate the DOM here
    const newParagraph = document.createElement('p');
    newParagraph.textContent = `👟 ${person.name.value} from ${person.country.value} will run on the next training!`;
    const participants = document.querySelector('.rsvp-participants');
    participants.appendChild(newParagraph);
    
}

/*** Form Validation [PLACEHOLDER] [ADDED IN UNIT 7] ***/
/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;

  var rsvpInputs = document.getElementById("rsvp-form").elements;

   let person = {
    name: rsvpInputs[0],
    email: rsvpInputs[1],
    country: rsvpInputs[2]
   };



  // TODO: Loop through all inputs
  for(const key in person){
    // TODO: Inside loop, validate the value of each input
    const input = person[key];
    if (input.value.trim().length < 2){
        containsErrors = true;
        input.classList.add('error');
    }
    else{
        input.classList.remove('error');
    }  
  }


  email = person["email"]

  if(!email.value.includes(".com") || !email.value.includes("@")){
    containsErrors = true;
    email.classList.add('error');
  }
  else{
     email.classList.remove('error');
  }


    // TODO: If no errors, call addParticipant() and clear fields
  if(!containsErrors){
        addParticipant(person);
        toggleModal(person);
        for(const entry in person){
            person[entry].value = "";
        }
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
    modalContent.textContent = `🎉 Thank you, ${person.name.value} from ${person.country.value}, for joining our run! You’ll receive updates at ${person.email.value}.`;


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

const initializeCarousel = () => {
    // Get elements
    const track = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsContainer = document.getElementById('paginationDots');
    
    // Carousel settings
    let currentPage = 0;
    const pageWidth = 1250; // Including gap
    const totalPages = 2;
    
    // CREATE DOTS
    const createDots = () => {
        dotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            if (i === 0) dot.classList.add('active'); // First dot active
            
            // Click event for each dot
            dot.addEventListener('click', () => {
                moveToPage(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    };
    
    // UPDATE DOTS
    const updateDots = () => {
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };
    
    // Function to move carousel (UPDATED)
    const moveToPage = (pageNumber) => {
        const moveDistance = pageNumber * pageWidth;
        track.style.transform = `translateX(-${moveDistance}px)`;
        currentPage = pageNumber;
        
        // Update buttons and dots
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
        updateDots(); // Add this line
    };
    
    // Your existing event listeners...
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            moveToPage(currentPage);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            moveToPage(currentPage);
        }
    });
    
    // Initialize
    createDots();
    moveToPage(0);
};

document.addEventListener('DOMContentLoaded', initializeCarousel);
