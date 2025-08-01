// !!!

import { setLocale } from 'yup';

// Global translations for yup error validations
setLocale({
  string: {
    // path = field name
    min: '${path} deveria ser >= ${min}', // min = variable number used to validate min string
    length: '${path} tem que ter ${length} caractere(s)', // length = variable number used to validate length string
  },
});
