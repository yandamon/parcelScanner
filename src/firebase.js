import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA3yP7-JSL4KiuogThWo3aEDZ_VintZD68',
  authDomain: 'fir-pra-86bb5.firebaseapp.com',
  databaseURL: 'https://fir-pra-86bb5.firebaseio.com',
  projectId: 'fir-pra-86bb5',
  storageBucket: 'fir-pra-86bb5.appspot.com',
  messagingSenderId: '991098826265',
  appId: '1:991098826265:web:f32092952fdfcace77c488',
  measurementId: 'G-X9GSGT0SBS',
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// database.ref('users').push({
//   barCode: 930067507961,
//   date: new Date('2020-07-17 08:01:08 +0000').toISOString(),
//   firstName: '',
//   lastName: '',
//   signedTime: new Date().toISOString(),
// });

export { firebase, database as default };
