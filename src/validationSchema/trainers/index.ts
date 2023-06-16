import * as yup from 'yup';

export const trainerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});
