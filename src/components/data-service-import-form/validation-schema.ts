import * as Yup from 'yup';

export default Yup.object().shape({
  url: Yup.string()
    .url('Feltet må være en gyldig URL')
    .required('URLen er påkrevd')
});
