import express from "express";
import {
    admin,
    loginPage,
    handleLogin,
    adminDashboard,
    authorsPage,
    deleteAuthor,
    usersPage,
    deleteUser,
    logout

} from "../controllers/adminControllers.js";

const router = express.Router();

// Admin login and dashboard routes
// router.get("/admin", admin);
// router.get("/login", loginPage);
// router.post("/login", handleLogin);
router.get("/dashboard", adminDashboard);

// Authors routes
router.get("/authors", authorsPage);
router.delete("/authors/:id", deleteAuthor);

// Users routes
router.get("/users", usersPage);
router.delete("/users/:id", deleteUser);
router.get("/logout", logout);


export default router;
