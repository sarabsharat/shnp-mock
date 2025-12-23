import * as Yup from 'yup';

export const validationSchemaInvite = (t: (key: string) => string) => Yup.object().shape({
    fullNameAr: Yup.string().required(t('nameInArabicIsRequired')),
    fullNameEn: Yup.string().required(t('nameInEnglishIsRequired')),
    email: Yup.string().email(t('invalidEmailFormat')).required(t('emailIsRequired')),
    mobile: Yup.string().min(8, t('mobileMustBeAtLeast8Digits')).required(t('phoneNumberIsRequired')),
    roles: Yup.array().min(1, t('atLeastOneRoleIsRequired')),
    dateOfBirth: Yup.string().nullable(),
    gender: Yup.string().nullable(),
});