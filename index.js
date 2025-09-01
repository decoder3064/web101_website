

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







