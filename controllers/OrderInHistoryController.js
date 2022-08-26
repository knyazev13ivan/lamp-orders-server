import OrderInHistoryModel from "../models/OrderInHistory.js";
import OrderInProgressModel from "../models/OrderInProgress.js";

export const getAll = async (req, res) => {
  try {
    const orderInHistory = await OrderInHistoryModel.find()

    res.json(orderInHistory);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить заказы",
    });
  }
};

export const create = async (req, res) => {
  try {
    
    const orderInProgress = await OrderInProgressModel.findOne({ _id: req.body.id });
    if (!orderInProgress) {
      throw Error("Нет такого заказа");
    }

    const doc = new OrderInHistoryModel({
      name: orderInProgress.order.name,
      number: orderInProgress.order.number,
      text: orderInProgress.order.text,
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

export const remove = async (req, res) => {
  try {
    const orderInHistoryId = req.params.id;

    OrderInHistoryModel.findByIdAndDelete(
      {
        _id: orderInHistoryId,
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
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить заказ",
    });
  }
};
