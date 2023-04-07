var btoa = require("btoa");

const useFetcher = async (url, bodyData = {}) => {
  var myHeaders = new Headers();
  const basicAuth =
    "Basic " + btoa(`${process.env.USER_ID}:${process.env.ACCESS_ID}`);

  myHeaders.append("Authorization", basicAuth);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  Object.keys(bodyData).map((key) => urlencoded.append(key, bodyData[key]));

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const res = await fetch(
    `https://json.astrologyapi.com/v1${url}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });

  return res;
};

module.exports = { useFetcher };
