import { celebrate, Joi, Segments } from 'celebrate';

/** middleware to verify all filds from user create */
export const userVerify = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});
