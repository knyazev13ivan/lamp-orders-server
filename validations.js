import { body } from "express-validator";

export const loginValidation = [
  body("login", "Неверный формат логина").isLength({ min: 5 }).isString(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("login", "Неверный формат логина").isLength({ min: 5 }).isString(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
];

export const orderInLineCreateValidation = [
  body("name", "Введите тип фонаря").isLength({ min: 3 }).isString(),
  body("number", "Введите количество фонарей в заказе").isNumeric(),
  body("priority", "Выберите приоритет").isNumeric(),
  body("text", "Введите описание").optional().isString(),
];
