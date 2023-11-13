const { getFirestore, collection, getDocs, addDoc, updateDoc, doc, setDoc,getDoc} = require('firebase/firestore');
const {firebase,admin} = require('../config')
const firestore = getFirestore(firebase);
