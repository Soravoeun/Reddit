import { Post } from "../models/postModel";

export const createPost = async (req, res) => {
  try {
      const newPost = await Post.create(req.body);
      console.log(newPost)
    res.json(newPost);
  } catch (error) {
    console.log(error.message);
  }
};

export const allPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(404).send({ message: "erreur d'afficher tous les postes" });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const post = await Post.findOne(req.body);
    res.json(post);
  } catch (error) {
    res.status(404).send({ message: "erreur d'affiche le poste" });
  }
};

export const updateOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = req.body;
    const editPost = await Post.findByIdAndUpdate(postId, postData, {
      new: true,
    });
      console.log(editPost)
    res.json(editPost);
  } catch (error) {
    res.status(404).send({ message: "erreur de modification" });
  }
};

export const deleteOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = req.body;
    const removePost = await Post.findByIdAndDelete(postId, postData, {
      new: true,
    });
      console.log("suppression reussite")
      res.json(removePost);
  } catch (error) {
    res.status(404).send({ message: "erreur dans la suppression" });
  }
};
