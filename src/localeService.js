
// TODO: replace mock response with API
function getLocalGreeting(language) {
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
* [ {"locale": "en", "message": "Hello!"} ]
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

module.exports = {
    getLocalGreeting
};
