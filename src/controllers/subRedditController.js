import SubReddit from "../models/subRedditModel";

export const createSubReddit = async (req, res) => {
  try {
    const newSubReddit = await SubReddit.create(req.body);
    res.json(newSubReddit);
  } catch (error) {
    res.status(404).send({ messgae: "erreur de creation de subReddit" });
  }
};

export const getAllSubReddits = async (req, res) => {
  try {
    const subReddits = await SubReddit.find();
    console.log("trouvé tous les subReddits");
    res.json(subReddits);
  } catch (error) {
    res
      .status(404)
      .send({ messgae: "erreur de la récupération des subReddit" });
  }
};

export const getOneSubReddit = async (req, res) => {
  const subRedditId = req.params.id;
  try {
    const oneSubReddit = await SubReddit.findById(subRedditId);
    if (!oneSubReddit) {
      return res.status(404).json({ messgae: "subReddit n'a pas été trouvé" });
    }
    res.json(oneSubReddit);
  } catch (error) {
    res
      .status(404)
      .send({ messgae: "erreur de la récupération d'un subReddit" });
  }
};

export const updateOneSubReddit = async (req, res) => {
  try {
    const subRedditId = req.params.id;
    const subRedditData = req.body;
    const editSubReddit = await SubReddit.findByIdAndUpdate(
      subRedditId,
      subRedditData,
      { new: true }
    );
    res.json(editSubReddit);
  } catch (error) {
    res
      .status(404)
      .send({ messgae: "erreur de la modification d'un subReddit" });
  }
};

export const removeSubReddit = async (req, res) => {
  try {
    const subRedditId = req.params.id;
    const editSubReddit = await SubReddit.findByIdAndDelete(subRedditId);
    if (!editSubReddit) {
      return res
        .status(404)
        .json({ message: "Le subReddit n'a pas été trouvé" });
    }
    res.json({ message: "Le commentaire a été supprimé avec succès" });
  } catch (error) {
    res
      .status(404)
      .send({ messgae: "erreur de la suppression d'un subReddit" });
  }
};
