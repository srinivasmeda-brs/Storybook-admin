import User from "../models/userModel.js";
import Story from "../models/storyModel.js";

const admin = (req, res, next) => {
    res.render("admin", { title: "Admin Page", message: "Welcome to the Admin Page!" });
};

const loginPage = (req, res) => {
    res.render("login", { title: "Admin Login", error: null });
};

const logout = (req, res) => {
     req.session.destroy((err) => {
         if (err) {
             console.error(err);
             return res.redirect("/api/dashboard");
         }
         res.redirect("/api/login");
     });
 };
 
 

const handleLogin = (req, res) => {
    const { username, password } = req.body;
    const admin = "svas77310@gmail.com";
    const pwd = "password123";

    if (username === admin && password === pwd) {
        res.redirect("/api/dashboard");
    } else {
        res.render("login", { title: "Admin Login", error: "Invalid credentials. Please try again." });
    }
};

const adminDashboard = (req, res) => {
    res.render("dashboard", { title: "Admin Dashboard", message: "Welcome, Admin!" });
};

const authorsPage = async (req, res, next) => {
     try {
         // Get page and limit for pagination
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 5; // Default 5 authors per page
         const skip = (page - 1) * limit;
 
         // Find authors
         const authors = await User.find({ isAuthor: true })
             .skip(skip)
             .limit(limit);
 
         // Count total authors for pagination
         const totalAuthors = await User.countDocuments({ isAuthor: true });
 
         // Find stories for these authors
         const authorIds = authors.map((author) => author._id);
         const stories = await Story.find({ userId: { $in: authorIds } });
 
         res.render("authors", {
             title: "Authors Page",
             authors,
             stories,
             currentPage: page,
             totalPages: Math.ceil(totalAuthors / limit),
         });
     } catch (error) {
         next(error);
     }
 };
 

 const deleteAuthor = async (req, res, next) => {
     try {
         const { id } = req.params;
 
         // Delete the author
         const deletedAuthor = await User.findByIdAndDelete(id);
 
         if (!deletedAuthor) {
             return res.status(404).json({ message: "Author not found." });
         }
 
         // Delete all stories associated with the author
         await Story.deleteMany({ userId: id });
 
         res.json({ message: "Author and their stories deleted successfully." });
     } catch (error) {
         next(error);
     }
 };
 
 const usersPage = async (req, res, next) => {
     try {
         // Get page and limit for pagination
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 5; // Default 5 users per page
         const skip = (page - 1) * limit;
 
         // Find users
         const users = await User.find({ isAuthor: false })
             .skip(skip)
             .limit(limit);
 
         // Count total users for pagination
         const totalUsers = await User.countDocuments({ isAuthor: false });
 
         res.render("users", {
             title: "Users Page",
             users,
             currentPage: page,
             totalPages: Math.ceil(totalUsers / limit),
         });
     } catch (error) {
         next(error);
     }
 };

 const deleteUser = async (req, res, next) => {
     try {
         const { id } = req.params;
 
         // Delete the user
         const deletedUser = await User.findByIdAndDelete(id);
 
         if (!deletedUser) {
             return res.status(404).json({ message: "User not found." });
         }
 
         res.json({ message: "User deleted successfully." });
     } catch (error) {
         next(error);
     }
 };
 

export {
    admin,
    loginPage,
    handleLogin,
    adminDashboard,
    authorsPage,
    deleteAuthor,
    usersPage,
    deleteUser,
    logout
 
};
