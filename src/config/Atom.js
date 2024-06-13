import {atomWithStorage, createJSONStorage} from 'jotai/utils';
export const fcmTokenAtom = atomWithStorage(
    'fcmtoken',
    '',
    createJSONStorage(()=> sessionStorage),
);
export const accessTokenAtom = atomWithStorage(
    'accessToken',
    '',
    createJSONStorage(()=> sessionStorage),
);
export const tokenAtom = atomWithStorage(
    'token',
    '',
    createJSONStorage(()=> sessionStorage),
);
export const usernameAtom = atomWithStorage(
    'username',
    '',
    createJSONStorage(()=> sessionStorage),
);

export const empAtom = atomWithStorage(
    'emp',
    {username:'',
    password:''},
    createJSONStorage(()=> sessionStorage),
);

export const admAtom = atomWithStorage(
    'adm',
    {
        admissionNum: '',
        patNum:'',
        patName:'',
        admissionDueDate:'',
        admissionDate:'',
        docDepartmentName:'',
        docName:'',
        bedsNum:'',
        admissionDischargeDueDate:'',
        admissionDischargeDate:'',
        admissionState:'',
    },
    createJSONStorage(()=> sessionStorage),

)
