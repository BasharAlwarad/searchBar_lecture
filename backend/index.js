import userData from "./users.json" assert { type: "json" };
import express from "express";
import cors from 'cors'
const app = express();
const PORT = 5000;

app.use(cors())

app.get("/api/users",(req,res)=>{
    return res.status(200).json(userData)
})

app.get("/api/users/search", (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredUsers);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
