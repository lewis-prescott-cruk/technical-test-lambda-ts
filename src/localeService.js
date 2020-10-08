
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

module.exports = {
    getLocalGreeting
};
