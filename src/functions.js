export function getBaseUrl(window) {
    if(window.location.href.includes('localhost') === true) {
      return `http://localhost:8000`;
    }
    return `https://privilegewalkbe.herokuapp.com`;
}