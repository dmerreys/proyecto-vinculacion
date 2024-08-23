import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// In-memory user store for example purposes
const users = [
  {
    id: 1,
    username: "vinculacion",
    password: "$2a$12$VvPd9yM/34sWjqDfxT1zN.PdkAUd7JafjNUMTxvgsnvMt2VIW6FBW", // hashed bcrypt 'vinculacion2024'
  },
];

const AuthController = {
  login: (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
    res.json({ token });
  },
};

export default AuthController;
