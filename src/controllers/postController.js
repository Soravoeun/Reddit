import { Post } from "../models/postModel";
import SubReddit from "../models/subRedditModel";

export const createPost = async (req, res) => {
  const { subRedditId } = req.params;
  console.log(req.params);
  const findOneSubReddit = await SubReddit.findById(subRedditId);
  if (!findOneSubReddit) {
    return res.status(404).json({ message: "SubReddit non trouvé" });
  }
  try {
    const newPost = await Post.create(req.body);
    console.log(newPost);
    findOneSubReddit.posts.push(newPost._id);
    await findOneSubReddit.save();
    res.json(newPost);
  } catch (error) {
    console.log(error.message);
  }
};

export const allPosts = async (req, res) => {
  const { subRedditId } = req.params;
  console.log(req.params);
  const findOneSubReddit = await SubReddit.findById(subRedditId);
  if (!findOneSubReddit) {
    return res.status(404).json({ message: "SubReddit non trouvé" });
  }
  try {
    const posts = await Post.find({ _id: findOneSubReddit.posts });
    res.json(posts);
  } catch (error) {
    res.status(404).send({ message: "erreur d'afficher tous les postes" });
  }
};

export const getOnePost = async (req, res) => {
  const { subRedditId, postId } = req.params;
  console.log(req.params);
  const findOneSubReddit = await SubReddit.findById(subRedditId);
  if (!findOneSubReddit) {
    return res.status(404).json({ message: "SubReddit non trouvé" });
  }
  try {
    const posts = await Post.find({ _id: findOneSubReddit.posts });
    if (!posts) {
      return res.status(404).json({ message: "Le post n'a pas été trouvé" });
    }
    // filter dans tous les posts du subReddit qui est un tableau par postID
    // item._id est un objetId que le toString le transforme en ""
    const post = posts.filter((item) => item._id.toString() === postId);
    console.log(posts);
    res.json(post);
  } catch (error) {
    res.status(404).send({ message: "erreur d'affiche le poste" });
  }
};

export const updateOnePost = async (req, res) => {
  const { subRedditId, postId } = req.params;
  console.log(req.params);
  const findOneSubReddit = await SubReddit.findById(subRedditId);
  if (!findOneSubReddit) {
    return res.status(404).json({ message: "SubReddit non trouvé" });
  }
  try {
    const postData = req.body;

    // verification du post présent dans le subReddit
    const posts = await Post.find({ _id: findOneSubReddit.posts });
    const post = posts.filter((item) => item._id.toString() === postId);
    console.log(posts);
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    // modification du post
    const editPost = await Post.findByIdAndUpdate(postId, postData, {
      new: true,
    });
    console.log(editPost);
    res.json("Post modifié avec succès");
  } catch (error) {
    res.status(404).send({ message: "erreur de modification" });
  }
};

export const deleteOnePost = async (req, res) => {
  const { subRedditId, postId } = req.params;
  console.log(req.params);
  // recherche du subReddit par son id
  const findOneSubReddit = await SubReddit.findById(subRedditId);
  if (!findOneSubReddit) {
    return res.status(404).json({ message: "SubReddit non trouvé" });
  }

  // verification du post présent dans le subReddit
  const posts = await Post.find({ _id: findOneSubReddit.posts });
  const post = posts.filter((item) => item._id.toString() === postId);
  console.log(posts);
  if (!post) {
    return res.status(404).json({ message: "Post non trouvé" });
  }

  try {
    const removePost = await Post.findByIdAndDelete(postId);
    console.log("coucou");
    if (!removePost) {
      return res.status(404).json({ message: "Le post n'a pas été trouvé" });
    }
    // console.log("Post supprimé avec succès");
    res.json("Post supprimé avec succès");
  } catch (error) {
    res.status(404).send({ message: "erreur dans la suppression" });
  }
};
