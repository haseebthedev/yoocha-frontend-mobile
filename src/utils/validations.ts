import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email address is required ')
    .email('Please enter a valid email')
    .label('Email'),
  password: yup.string().required().label('Password'),
});

export const signupValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3)
    .required('First Name is required')
    .label('First Name'),
  lastName: yup
    .string()
    .min(3)
    .required('Last Name is required')
    .label('Last Name'),
  email: yup
    .string()
    .required('Email address is required ')
    .email('Please enter a valid email')
    .label('Email'),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, and a  Number ',
    )
    .min(8)
    .label('Password'),
  confirmPassword: yup
    .string()
    .equals([yup.ref('password'), null], 'Passwords does not match'),
  userType: yup.string().label('LOCATION TYPE'),
});

export const createServicesValidationSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  price: yup.string().required().label('Price'),
  discountAmount: yup.number().label('Discount Offer'),
  description: yup.string().required().label('Description'),
});

export const addInfoValidationSchema = yup.object().shape({
  bio: yup.string().required().label('Bio'),
  number: yup
    .string()
    .required()
    .min(8, 'Invalid phone number, Too Short')
    .max(18)
    .label('Number'),
});

export const ProfileLinkValidationSchema = yup.object().shape({
  profileLink: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!',
    )
    .required('Please enter website')
    .label('Profile Link'),
});

export const loyalityProgramValidationSchema = yup.object().shape({
  points: yup.number().label('Points'),
  discountAmount: yup.number().label('DiscountAmount'),
  loyalityProgram: yup.boolean().label('Loyality Program'),
});

export const sendFeedbackValidationSchema = yup.object().shape({
  subject: yup.string().label('Subject'),
  description: yup.string().required().label('Description'),
  email: yup.string().required().label('Email').email(),
});

export const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup.string().required().min(8).label('Current Password'),
  newPassword: yup
    .string()
    .required('Password Field is Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, and a  Number ',
    )
    .min(8)
    .label('New Password'),
  confirmPassword: yup
    .string()
    .equals([yup.ref('newPassword'), null], 'Passwords does not match')
    .label('Confirm Password'),
});

export const addAddressValidationSchema = yup.object().shape({
  locationType: yup.string().required('Required').label('Location Type'),
  barberShopName: yup.string().required('Required').label('Barber Shop Name'),
});

export const editAccountValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required field')
    .label('First Name'),
  lastName: yup.string().label('Last Name'),
});

export const forgotPasswordValidation = yup.object().shape({
  email: yup.string().required().email(),
});

export const newPasswordValidation = yup.object().shape({
  newPassword: yup
    .string()
    .required('This field is required')
    .min(8, 'Minimum 8 characters'),
  confirmPassword: yup
    .string()
    .equals([yup.ref('newPassword'), null], 'Passwords does not match'),
});
