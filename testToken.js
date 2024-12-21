const jwt = require('jsonwebtoken');

// Example token you want to test
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjY1ZmFiOTllZmM5ZTRkMjBjYTU4NyIsInJvbGUiOiJzZWxsZXIiLCJpYXQiOjE3MzQ3Njc0NTYsImV4cCI6MTczNDc2ODM1Nn0.riTFK4On4wXJSD5rZK4_0s3hAPqnUv0DudkODUQMs40" ; // Replace with the actual token you want to test

// Your JWT secret key from environment or config
const JWT_SECRET = "41bb1ea4d6ff295e293e7155d52932518a3f1538378a9b92b38cea38943fcb1b"; // Use your actual secret key

// Verify the token
jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
        console.log('Invalid Token:', err.message);
    } else {
        console.log('Decoded Token:', decoded); // Prints the decoded token payload
    }
});
