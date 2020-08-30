const Post = require("../models/post");

exports.createPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        creator: req.userData.userId,
        date: req.body.date
    });
    console.log(post);
    post.save().then(createdPost => {
        res.status(201).json({
            message: "Post added successfully!",
            postId: createdPost._id
        });
    });
}

exports.updatePost = (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        creator: req.userData.userId,
        date: req.body.date
    });
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: "Update successful!" });
        } else {
            res.status(401).json({ message: "Unauthorized PUT request." });
        }
    });
}

exports.getPost = (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents
        });
    });
}

exports.getPostByUserId = (req, res, next) => {
    Post.find({ creator: req.userData.userId }).then(documents => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents
        });
    });
}

exports.getPostById = (req, res, next) => {
    console.log(req.params);
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found." });
        }
    });
}

exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: "Delete request successful!" });
        } else {
            res.status(401).json({ message: "Unauthorized DELETE request." });
        }
    });
}
