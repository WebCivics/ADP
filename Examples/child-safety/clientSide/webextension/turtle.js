// Simple Turtle parser (you might want to use a library for complex parsing)
function parseTTL(data) {
    let rating = "G"; // Default rating if none is found
  
    // Extract rating from the Turtle file (simplified)
    let match = data.match(/<http:\/\/example\.org\/rating> "([^"]+)"/);
    if (match && match[1]) {
      rating = match[1];
    }
  
    return { rating: rating };
  }
  