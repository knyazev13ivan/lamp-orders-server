import OrderInLineModel from "../models/OrderInLine.js";
import LampModel from "../models/Lamp.js";

export const getAll = async (req, res) => {
  try {
    const ordersInLine = await OrderInLineModel.find().populate("user").exec();

    res.json(ordersInLine);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить заказы",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const orderInLineId = req.params.id;

    OrderInLineModel.findByIdAndDelete(
      {
        _id: orderInLineId,
      },
      (error, doc) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Не удалось удалить заказ",
          });
        }

        if (!doc) {
          return res.status(500).json({
            message: "Заказ не найден",
          });
        }

        res.json({
          success: true,
        })
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить заказ",
    });
  }
};

export const create = async (req, res) => {
  try {
    const lamp = await LampModel.findOne({name: req.body.name})

    if (!lamp) {
      throw Error('Указан неверный тип фонаря')
    }

    const doc = new OrderInLineModel({
      name: lamp.name,
      number: req.body.number,
      priority: req.body.priority,
      text: req.body.text,
      user: req.userId,
    });

    const order = await doc.save();

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать заказ",
    });
  }
};
