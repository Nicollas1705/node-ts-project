import * as yup from 'yup';

export const YupValidations = {
  // * Despite the yup global translations, any validation can also has an internal translation only for this case:
  // * Example: yup.string().required('msg').min(3, 'msg').max(150, 'msg')
  id: yup.number().integer().required().moreThan(0),
  name: yup.string().required().min(3).max(150),
  email: yup.string().required().email().max(150),
  intPositiveOptional: yup.number().integer().optional().moreThan(0),
  textOptional: yup.string().optional(),
};
