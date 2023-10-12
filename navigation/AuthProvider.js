import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  // const getFcmToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log('FCM token:', token);
  //     firestore().collection('users').doc(auth().currentUser.uid).set({
  //       token: token
  //   }, { merge: true });

  //   } catch (error) {
  //     console.log('Error retrieving FCM token:', error);
  //   }
  // };
  
  return (  
    <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              await auth().signInWithEmailAndPassword(email, password);
              // getFcmToken();
            } catch (e) {
              alert(e);
            }
          },
          forgotPassword: async(email) => {
            await auth().sendPasswordResetEmail(email)
            .then(() => {
              alert('Password reset email sent, please check your email!');
            }).catch((e) => {
              alert(e);
            })
          },
          googleLogin: async () => {
            try{
              // Get the users ID token
              const { idToken } = await GoogleSignin.signIn();
              // Create a Google credential with the token
              const googleCredential = auth.GoogleAuthProvider.credential(idToken);
              // Sign-in the user with the credential
             // await auth().signInWithCredential(googleCredential)
             // getFcmToken();
              await auth().signInWithCredential(googleCredential)
              .then(() => {
                // getFcmToken();
                // firestore().collection('users').doc(auth().currentUser.uid)
                // .set({
                //     id: auth().currentUser.uid,
                //     name: auth().currentUser.displayName,
                //     email: auth().currentUser.email,
                //     userImg: auth().currentUser.photoURL,
                // })
                // .catch(error => {
                //     console.log('Something went wrong with added user to firestore: ', error);
                // })
              })
              .catch(error => {
                alert('Something went wrong! ' + error);
              });
            } catch(error) {
                alert('Something went wrong! ' + error);
            }
          },
          register: async (email, password, name) => {
            try {
              await auth().createUserWithEmailAndPassword(email, password)
              .then(() => {
                // firestore().collection('users').doc(auth().currentUser.uid)
                // .set({
                //     id: auth().currentUser.uid,
                //     name: name,
                //     email: auth().currentUser.email,
                //     userImg: auth().currentUser.photoURL,
                //     about: '',
                // })
                // .catch(error => {
                //     console.log('Something went wrong with added user to firestore: ', error);
                // })
              });

            //   auth().currentUser.updateProfile({
            //     displayName: name,
            //   })
            //   .catch((error) => {
            //     console.log('Error updating displayName:', error);
            //   });           
            
            } catch (e) {
              console.log(e);
              alert(e);
            }
          },         
          logout: async () => {
            try {
              await auth().signOut();
            } catch (e) {
              console.error(e);
            }
          }
        }}
    >
        {children}
    </AuthContext.Provider>
  );
}