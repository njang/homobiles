import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyA1rhi1cnMhEhh89wy5ZzQ5Tvvz8uO6NcM",
  authDomain: "sample-project-af6b6.firebaseapp.com",
  databaseURL: "https://sample-project-af6b6.firebaseio.com",
  projectId: "sample-project-af6b6",
  storageBucket: "sample-project-af6b6.appspot.com",
  messagingSenderId: "422544391065"
};

firebase.initializeApp(config);

export default firebase;