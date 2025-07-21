import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDRBcv6AyCpmsYLk4EKbj-9dfoarMB_CiA",
  authDomain: "level-two-project-2025.firebaseapp.com",
  databaseURL: "https://level-two-project-2025-default-rtdb.firebaseio.com",
  projectId: "level-two-project-2025",
  storageBucket: "level-two-project-2025.appspot.com", // fixed .com
  messagingSenderId: "145312405735",
  appId: "1:145312405735:web:a8234c0983817a23986a42",
  measurementId: "G-XGP885LX3Q"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const signUp = document.getElementById('signUp');
signUp.addEventListener('click', async (event) => {
  event.preventDefault();
  signUp.disabled = true;
  signUp.innerText = 'Signing up...';

  const email = document.getElementById('email').value.trim();
  const title = document.getElementById('title').value.trim();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const country = document.getElementById('country').value;
  const language = document.getElementById('language').value;
  const code = document.getElementById('code').value;
  const mobile = document.getElementById('mobile').value;
  const check1 = document.getElementById('check1').checked;
  const check2 = document.getElementById('check2').checked;

  // Basic validation
  if (!email || !password || !firstName || !lastName) {
    showMessage("Please fill all required fields.", "signUpMessage");
    signUp.disabled = false;
    signUp.innerText = 'Sign Up';
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = {
      email,
      title,
      firstName,
      lastName,
      dob,
      country,
      language,
      code,
      mobile,
      check1,
      check2
    };
    showMessage("Sign up successful!", "signUpMessage");
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData);
    console.log("User data saved successfully!");
    window.location.href = 'index.html';
  } catch (error) {
    console.error("Sign up error:", error);
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Email already in use. Please use a different email.", "signUpMessage");
    } else if (error.code === 'auth/invalid-email') {
      showMessage("Invalid email address.", "signUpMessage");
    } else if (error.code === 'auth/weak-password') {
      showMessage("Password should be at least 6 characters.", "signUpMessage");
    } else {
      showMessage("Unable to create User: " + error.message, "signUpMessage");
    }
    signUp.disabled = false;
    signUp.innerText = 'Sign Up';
  }
});