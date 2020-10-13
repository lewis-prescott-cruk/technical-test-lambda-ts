import axios from 'axios'

// TODO: replace mock response with API axios request
function getLocalGreeting(language: string) {
    switch(language) {
      case "en":
        return "Hello!";
      case "es":
        return "¡Hola!";
      case "ru":
        return "Привет!";
      default:
        return "👋";
    }
}

/**
* Example Response, List of locale messages:
* [ {"locale": "en", "message": "Hello!"}, {"locale": "es", "message": "¡Hola!"} ]
*/
async function getAllLocales() {
  try {
    const response = await axios.get(`http://localhost/v1/locales`,
      { headers: { Authorization: "Bearer Token" } }
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
    return {
        error: error.error,
        message: error.message
    }
  }
}

const locales = {
  getLocalGreeting
}

export default locales;
