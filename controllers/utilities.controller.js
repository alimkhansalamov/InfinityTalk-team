const Utility = require('./../models/Utility.model');

module.exports.utilitiesController = {
  getUtilities: async (req, res) => {
    try {
      const utilities = await Utility.find();
      return res.json(utilities);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createUtility: async (req, res) => {
    const { utilityImage, utilityTitle, utilityCategory, utilityLink } = req.body;

    try {
      const utilities = await Utility.create({
        utilityImage,
        utilityTitle,
        utilityCategory,
        utilityLink,
      });
      return res.json(utilities);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
  removeUtility: async (req, res) => {
    const { id } = req.params;
    try {
      await Utility.findByIdAndDelete(id);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
  editUtility: async (req, res) => {
    const { utilityImage, utilityTitle, utilityCategory, utilityLink, } = req.body;
    const { id } = req.params;

    try {
      const edited = await Utility.findByIdAndUpdate(
        id,
        {
          utilityImage,
          utilityTitle,
          utilityCategory,
          utilityLink,
        },
        { new: true }
      );
      return res.json(edited);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};