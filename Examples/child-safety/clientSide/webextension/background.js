let blockRating = "PG";

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Assuming ADP file is hosted at a specific URL on the server
    let adpFileUrl = details.url + "/adp.ttl";

    return fetch(adpFileUrl)
      .then(response => response.text())
      .then(adpData => {
        let rating = parseTurtleFile(adpData);
        if (shouldBlock(rating)) {
          return { cancel: true };
        }
      })
      .catch(err => {
        console.error("Failed to fetch or parse ADP file:", err);
      });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

function parseTurtleFile(data) {
  // Use a Turtle parser library or write your own parser
  // Here we'll assume a function parseTTL exists
  let parsedData = parseTTL(data);
  return parsedData.rating; // Assuming the rating is extracted this way
}

function shouldBlock(rating) {
  const ratings = ["G", "PG", "M", "MA", "R", "X"];
  const thresholdIndex = ratings.indexOf(blockRating);
  const siteRatingIndex = ratings.indexOf(rating);

  return siteRatingIndex >= thresholdIndex;
}
