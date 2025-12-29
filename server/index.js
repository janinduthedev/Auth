import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.listen(5000, () => console.log("Server running on port 5000 🚀"));