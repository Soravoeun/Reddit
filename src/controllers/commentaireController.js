import { Commentaire } from "../models/commentaireModel";
import { Post } from "../models/postModel";
import SubReddit from "../models/subRedditModel";

export const createCommentaire = async (req, res) => {
  const { postId } = req.params;
  const findOnePost = await Post.findById(postId);
  if (!findOnePost) {
    return res.status(404).json({ message: "Post non trouvé" });
  }
  try {
    const newCommentaire = await Commentaire.create(req.body);
    console.log(newCommentaire);

    findOnePost.comments.push(newCommentaire._id);
    await findOnePost.save();
    res.json(newCommentaire);
  } catch (error) {}
};

export const allCommentaire = async (req, res) => {
  const { postId } = req.params;
  const findOnePost = await Post.findById(postId);
  console.log(findOnePost);
  if (!findOnePost) {
    return res.status(404).json({ message: "Post non trouvé" });
  }
  try {
    const commentaires = await Commentaire.find({ _id: findOnePost.comments });
    res.json(commentaires);
  } catch (error) {
    res
      .status(404)
      .send({ messgae: "erreur d'affichage de tous les commentaires" });
  }
};

export const getOneCommentaire = async (req, res) => {
  const { postId, commentId } = req.params;
  const findOnePost = await Post.findById(postId);
  console.log(findOnePost);
  if (!findOnePost) {
    return res.status(404).json({ message: "Post non trouvé" });
  }

  try {
    const commentaires = await Commentaire.find({ _id: findOnePost.comments });
    if (!commentaires) {
      return res
        .status(404)
        .json({ message: "Le commentaire n'a pas été trouvé" });
    }

    const commentaire = commentaires.filter(
      (item) => item._id.toString() === commentId
    );
    res.json(commentaire);
  } catch (error) {
    console.error("Erreur lors de l'affichage du commentaire :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'affichage du commentaire" });
  }
};

export const updateOneCommentaire = async (req, res) => {
  const { postId, commentId } = req.params;
  const findOnePost = await Post.findById(postId);
  console.log(findOnePost);
  if (!findOnePost) {
    return res.status(404).json({ message: "Post non trouvé" });
  }
  // recupère tous les commentaires  dans le post par son id
  const commentaires = await Commentaire.find({ _id: findOnePost.comments });
  if (!commentaires) {
    return res
      .status(404)
      .json({ message: "Le commentaire n'a pas été trouvé" });
  }

  // on recupère le commentaire en filtrant par son id
  const commentaire = commentaires.filter(
    (item) => item._id.toString() === commentId
  );

  try {
    const commentaireData = req.body;
    // modification du commentaire
    const commentaire = await Commentaire.findByIdAndUpdate(
      commentId,
      commentaireData,
      { new: true }
    );
    console.log(commentaire);
    res.json("commentaire modifié avec success");
  } catch (error) {
    res.status(404).send({ messgae: "erreur de modification du commentaire" });
  }
};

export const deleteOneCommentaire = async (req, res) => {
  const { postId, commentId } = req.params;

  // trouver le post par son id dans tous les postes
  const findOnePost = await Post.findById(postId);
  console.log(findOnePost);
  if (!findOnePost) {
    return res.status(404).json({ message: "Post non trouvé" });
  }
  // recupère tous les commentaires  dans tous les post par son id
  const commentaires = await Commentaire.find({ _id: findOnePost.comments });
  if (!commentaires) {
    return res
      .status(404)
      .json({ message: "Le commentaire n'a pas été trouvé" });
  }
  // on recupère le commentaire en filtrant par son id
  const commentaire = commentaires.filter(
    (item) => item._id.toString() === commentId
  );
  if (!commentaire) {
    return res.status(404).json({ message: "Post non trouvé" });
  }

  try {
    // on retire le commentaire du poste (en n'incluant pas celui avec id trouvé)
    findOnePost.comments = findOnePost.comments.filter(
      (item) => item.toString() !== commentId
    );
    console.log(
      findOnePost.comments.filter((item) => item.toString() !== commentId)
    );
    console.log(findOnePost.comments);
    await findOnePost.save();

    // supression du commentaire
    const removeCommentaire = await Commentaire.findByIdAndDelete(commentId);

    if (!removeCommentaire) {
      return res
        .status(404)
        .json({ message: "Le commentaire n'a pas été trouvé" });
    }
    res.json({ message: "Le commentaire a été supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du commentaire" });
  }
};
