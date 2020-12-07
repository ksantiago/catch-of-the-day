import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAz3Zs1icFAKEKrg8pLMjhRaWz46nIGf1A",
  authDomain: "catch-of-the-day-ks-11851.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-ks-11851-default-rtdb.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }

export default base
