import * as yup from 'yup';

export const memberValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string(),
  gym_id: yup.string().nullable(),
});
