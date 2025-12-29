import jwt from 'jsonwebtoken';

// This function checks if the user is logged in
export const verifyToken = (req, res, next) => {
    // Get the token from the header
    const authHeader = req.header('Authorization');

    // If no token exists, stop and send an error
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token, access denied" });
    }

    // Get the actual token string
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token using our secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Save user data to the request
        next(); // Go to the next step
    } catch (err) {
        // If token is wrong or expired
        res.status(403).json({ message: "Token is not valid" });
    }
};