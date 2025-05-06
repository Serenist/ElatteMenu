// Add these functions at the top of your file
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function hideBackButton() {
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.style.display = "none";
    }
}

const translations = {
    english: {
      title: "Menu",
      coffee: "☕ Coffees",
      beverages: "🥤 Beverages",
      sandwich: "🥪 Sandwiches",
      pastry: "🥐 Pastries"
    },
    greek: {
      title: "Μενού",
      coffee: "☕ Καφέδες",
      beverages: "🥤 Αναψυκτικά",
      sandwich: "🥪 Σάντουιτς",
      pastry: "🥐 Σφολιάτες"
    }
  };
  
  function switchToEnglish() {
    const lang = translations.english;
    document.getElementById("subtitle").textContent = lang.title;
    document.getElementById("coffee").textContent = lang.coffee;
    document.getElementById("beverages").textContent = lang.beverages;
    document.getElementById("sandwich").textContent = lang.sandwich;
    document.getElementById("pastry").textContent = lang.pastry;
    setCookie('preferred_language', 'english', 30); // Store preference for 30 days
}

function switchToGreek() {
    const lang = translations.greek;
    document.getElementById("subtitle").textContent = lang.title;
    document.getElementById("coffee").textContent = lang.coffee;
    document.getElementById("beverages").textContent = lang.beverages;
    document.getElementById("sandwich").textContent = lang.sandwich;
    document.getElementById("pastry").textContent = lang.pastry;
    setCookie('preferred_language', 'greek', 30); // Store preference for 30 days
}

// Modify the loadPreferredLanguage function
function loadPreferredLanguage() {
    // Force scroll to top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Reset scroll position
    window.scrollTo(0, 0);

    const preferred = getCookie('preferred_language');
    if (preferred === 'greek') {
        switchToGreek();
    } else if (preferred === 'english') {
        switchToEnglish();
    }
    // Hide back button on page load
    hideBackButton();
    // Hide menu image on page load
    const imageElement = document.getElementById("menu-image");
    if (imageElement) {
        imageElement.style.display = "none";
    }
    // Show menu buttons on page load
    const menuButtons = document.getElementById("menu-buttons");
    if (menuButtons) {
        menuButtons.style.display = "flex";
    }
}

// Map categories to Google Drive image links
const imageLinks = {
    coffee: "./Coffees.jpg",
    beverages: "./Dark Black Chalkboard Texture Coffee Shop Menu.jpg",
    sandwich: "./Dark Black Chalkboard Texture Coffee Shop Menu.jpg",
    pastry: "./Dark Black Chalkboard Texture Coffee Shop Menu.jpg"
};

function showImage(category) {
    const imageElement = document.getElementById("menu-image");
    const menuButtons = document.getElementById("menu-buttons");
    const backButton = document.getElementById("back-button");

    if (imageLinks[category]) {
      imageElement.src = imageLinks[category]; // Set the image source
      imageElement.style.display = "block"; // Show the image
      menuButtons.style.display = "none"; // Hide the menu buttons
      backButton.style.display = "block"; // Show the back button
      if(getCookie('preferred_language') === 'greek') {
        if (category === 'coffee') {
            document.getElementById("subtitle").textContent = "Καφέδες";
            }
            else if (category === 'beverages') {
            document.getElementById("subtitle").textContent = "Αναψυκτικά";
        }   else if (category === 'sandwich') {
            document.getElementById("subtitle").textContent = "Σάντουιτς";
        }   else if (category === 'pastry') {
            document.getElementById("subtitle").textContent = "Σφολιάτες";
        }
    }
        else if(getCookie('preferred_language') === 'english') {
            if (category === 'coffee') {
                document.getElementById("subtitle").textContent = "Coffees";
            }   else if (category === 'beverages') {
                document.getElementById("subtitle").textContent = "Beverages";
            }   else if (category === 'sandwich') {
                document.getElementById("subtitle").textContent = "Sandwiches";
            }   else if (category === 'pastry') {
                document.getElementById("subtitle").textContent = "Pastries";
            }
        }
    }
}

function goBack() {
    const imageElement = document.getElementById("menu-image");
    const menuButtons = document.getElementById("menu-buttons");
    const backButton = document.getElementById("back-button");

    // Reset subtitle to default based on language preference
    const preferred = getCookie('preferred_language');
    if (preferred === 'greek') {
        document.getElementById("subtitle").textContent = translations.greek.title;
    } else {
        document.getElementById("subtitle").textContent = translations.english.title;
    }

    imageElement.style.display = "none"; // Hide the image
    menuButtons.style.display = "flex"; // Show the menu buttons
    backButton.style.display = "none"; // Hide the back button
}

// Add this line at the bottom of your file
// This ensures the function runs when the page loads
document.addEventListener('DOMContentLoaded', loadPreferredLanguage);

// Add event listener for page load
window.onload = function() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
};

// Add viewport height adjustment function
function setViewportHeight() {
    const vh = window.innerHeight * 0.01; // 1% of the viewport height
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set the viewport height on load and resize
window.addEventListener('resize', setViewportHeight);
window.addEventListener('load', setViewportHeight);