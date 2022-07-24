import OperationsModel from "../models/Operations.js";

export const getAll = async (req, res) => {
  try {
    const operations = await OperationsModel.find();

    res.json(operations);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить доступ к операциям",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new OperationsModel({
      locksmith: req.body.locksmith,
      painter: req.body.painter,
      millwright: req.body.millwright,
    });

    const operations = await doc.save();

    res.json(operations);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать операции",
    });
  }
};