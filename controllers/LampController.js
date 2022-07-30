import LampModel from "../models/Lamp.js";

export const getOne = async (req, res) => {
  try {
    const lampName = req.body.name;

    LampModel.findOne(
      {
        name: lampName,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось получить фонарь",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Такоо фонаря не существует",
          });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось найти фонарь",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new LampModel({
      name: req.body.name,
      locksmith: req.body.locksmith,
      painter: req.body.painter,
      millwright: req.body.millwright,
    });

    const lamp = await doc.save();

    res.json(lamp);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать тип фонаря",
    });
  }
};
