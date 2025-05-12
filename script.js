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
      // Push a new state for the menu view
      history.pushState({ page: category }, '', '');

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

// Modify the goBack function to also push a history state
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

    // Push a new state to the history stack
    history.pushState({ page: 'home' }, '', ''); // Push a custom state
}

// Add this line at the bottom of your file
// This ensures the function runs when the page loads
document.addEventListener('DOMContentLoaded', loadPreferredLanguage);

// Add event listener for page load
window.onload = function() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
};

function updateScreenClass() {
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  //document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
  document.body.classList.remove('small-screen', 'medium-screen', 'large-screen');
  if (vh <= 500) {
    document.body.classList.add('small-screen');
  } else if (vh <= 720) {
    document.body.classList.add('medium-screen');
  } else {
    document.body.classList.add('large-screen');
  }
}

// Update on resize, load, and viewport changes
window.addEventListener('resize', updateScreenClass);
window.addEventListener('load', updateScreenClass);
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateScreenClass);
}

window.addEventListener('popstate', function (event) {
    if (event.state && event.state.page === 'home') {
        // Reset the app to the home state
        const imageElement = document.getElementById("menu-image");
        const menuButtons = document.getElementById("menu-buttons");
        const backButton = document.getElementById("back-button");

        imageElement.style.display = "none"; // Hide the image
        menuButtons.style.display = "flex"; // Show the menu buttons
        backButton.style.display = "none"; // Hide the back button

        // Reset subtitle to default based on language preference
        const preferred = getCookie('preferred_language');
        if (preferred === 'greek') {
            document.getElementById("subtitle").textContent = translations.greek.title;
        } else {
            document.getElementById("subtitle").textContent = translations.english.title;
        }
    } else {
        // If no state or not "home", allow the default back behavior
        window.location.href = 'https://serenist.github.io/ElatteMenu/'; // Redirect to home page
    }
});

// Push an initial state when the page loads
window.addEventListener('load', function () {
    history.replaceState({ page: 'home' }, '', ''); // Replace the current state with a custom one
});