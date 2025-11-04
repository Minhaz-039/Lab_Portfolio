import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import db from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Contact form route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Save to MySQL
  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database Error" });
    }

    // Send Email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      text: message,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Email not sent" });
      }
      res.status(200).json({ success: "Message sent successfully!" });
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 🚀`);
});
