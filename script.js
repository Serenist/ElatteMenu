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

const translations = {
    english: {
      title: "Menu",
      coffee: "☕ Coffees",
      drinks: "🥤 Beverages",
      sandwich: "🥪 Sandwiches",
      pastry: "🥐 Pastries"
    },
    greek: {
      title: "Μενού",
      coffee: "☕ Καφέδες",
      drinks: "🥤 Αναψυκτικά",
      sandwich: "🥪 Σάντουιτς",
      pastry: "🥐 Σφολιάτες"
    }
  };
  
  function switchToEnglish() {
    const lang = translations.english;
    document.getElementById("subtitle").textContent = lang.title;
    document.getElementById("coffee").textContent = lang.coffee;
    document.getElementById("drinks").textContent = lang.drinks;
    document.getElementById("sandwich").textContent = lang.sandwich;
    document.getElementById("pastry").textContent = lang.pastry;
    setCookie('preferred_language', 'english', 30); // Store preference for 30 days
}

function switchToGreek() {
    const lang = translations.greek;
    document.getElementById("subtitle").textContent = lang.title;
    document.getElementById("coffee").textContent = lang.coffee;
    document.getElementById("drinks").textContent = lang.drinks;
    document.getElementById("sandwich").textContent = lang.sandwich;
    document.getElementById("pastry").textContent = lang.pastry;
    setCookie('preferred_language', 'greek', 30); // Store preference for 30 days
}

// Add this function to load the preferred language on page load
function loadPreferredLanguage() {
    const preferred = getCookie('preferred_language');
    if (preferred === 'greek') {
        switchToGreek();
    } else if (preferred === 'english') {
        switchToEnglish();
    }
    // If no preference is stored, keep default language
}

// Map categories to Google Drive image links
const imageLinks = {
    coffee: "./Coffees.jpg",
    drinks: "./Dark Black Chalkboard Texture Coffee Shop Menu.jpg",
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
            else if (category === 'drinks') {
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
            }   else if (category === 'drinks') {
                document.getElementById("subtitle").textContent = "Drinks";
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
    menuButtons.style.display = "block"; // Show the menu buttons
    backButton.style.display = "none"; // Hide the back button
}