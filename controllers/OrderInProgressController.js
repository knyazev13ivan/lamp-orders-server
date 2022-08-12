import OrderInProgressModel from "../models/OrderInProgress.js";
import LampModel from "../models/Lamp.js";
import OrderInLineModel from "../models/OrderInLine.js";

export const getAll = async (req, res) => {
  try {
    const orderInProgress = await OrderInProgressModel.find()
      .populate("order")
      .exec();

    res.json(orderInProgress);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить заказы",
    });
  }
};

export const create = async (req, res) => {
  try {
    const orderInLine = await OrderInLineModel.findOne({ _id: req.body.id });
    if (!orderInLine) {
      throw Error("Нет такого заказа");
    }

    const lamp = await LampModel.findOne({ name: orderInLine.name });
    if (!lamp) {
      throw Error("Указан неверный тип фонаря");
    }

    const doc = new OrderInProgressModel({
      order: orderInLine,
      locksmith: lamp.locksmith.map(e => ({name: e, isDone: false})),
      painter: lamp.painter.map(e => ({name: e, isDone: false})),
      millwright: lamp.millwright.map(e => ({name: e, isDone: false})),
      isPause: req.body.isPause,
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

export const update = async (req, res) => {
  try {
    const step = req.body.step;
    const operation = req.body.operation

    OrderInProgressModel.findOneAndUpdate({
      _id: req.body.id,
    }, {
      // $set: { lamp[step][operation].isDone: true }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить статус заказа",
    });
  }
}

export const getOne = async (req, res) => {
  try {
    const orderInProgress = await OrderInProgressModel.findOne(
      {
        _id: req.body.id,
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
    )
      .populate("order")
      .exec();

    res.json(orderInProgress);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить заказ",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const orderInProgressId = req.params.id;

    OrderInProgressModel.findByIdAndDelete(
      {
        _id: orderInProgressId,
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
