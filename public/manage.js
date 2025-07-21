import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDRBcv6AyCpmsYLk4EKbj-9dfoarMB_CiA",
  authDomain: "level-two-project-2025.firebaseapp.com",
  databaseURL: "https://level-two-project-2025-default-rtdb.firebaseio.com",
  projectId: "level-two-project-2025",
  storageBucket: "level-two-project-2025.appspot.com", 
  messagingSenderId: "145312405735",
  appId: "1:145312405735:web:a8234c0983817a23986a42",
  measurementId: "G-XGP885LX3Q"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  loginButton.disabled = true;
  loginButton.innerText = 'Logging in...';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMessage("Please fill all required fields.", "signInMessage");
    loginButton.disabled = false;
    loginButton.innerText = 'Login';
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("Login successful!", "signInMessage");
      const user = userCredential.user;
      localStorage.setItem('emirateUserUID', user.uid); 
            window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        showMessage('Incorrect Email or Password', "signInMessage");
      } else if (error.code === 'auth/user-not-found') {
        showMessage('Account does not Exist', "signInMessage");
      } else {
        showMessage('Login failed: ' + error.message, "signInMessage");
      }
      loginButton.disabled = false;
      loginButton.innerText = 'Login';
    });
});
        // Tab Switching Functionality
        const tabs = document.querySelectorAll('.border-b button');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('tab-active'));
                this.classList.add('tab-active');
                
                // Here you would typically load different content for each tab
                console.log(`Switched to ${this.textContent} tab`);
            });
        });

        // Mobile Menu Toggle
        const mobileMenuButton = document.querySelector('.md\\:hidden.text-white');
        mobileMenuButton.addEventListener('click', function() {

            // This would toggle a mobile menu
            console.log('Mobile menu toggled');
            alert('Mobile menu functionality would appear here');
        });

        // Flight Card Hover Effects
        const flightCards = document.querySelectorAll('.flight-card');
        flightCards.forEach(card => {
            card.addEventListener('click', function() {
                // This would show flight details
                console.log('Showing flight details');
            });
        });