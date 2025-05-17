const getCarsData = async () => {
    const response = await fetch("https://api.jsonstorage.net/v1/json/8cab9a76-7081-4dc2-b37d-1cea97a946bb/d97055a0-129d-4ebf-814b-615d459939e6");
    const responseJSON = await response.json();
    return responseJSON;
}

module.exports = getCarsData;