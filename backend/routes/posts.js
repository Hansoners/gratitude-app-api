const express = require("express");
const postController = require("../controllers/posts")
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("", checkAuth, postController.createPost);
router.put("/:id", checkAuth, postController.updatePost);
router.get("", checkAuth, postController.getPost);
router.get("/:id", checkAuth, postController.getPostById);
router.get("/user/:id", checkAuth, postController.getPostByUserId);
router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;