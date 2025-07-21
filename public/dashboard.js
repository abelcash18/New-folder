import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDRBcv6AyCpmsYLk4EKbj-9dfoarMB_CiA",
  authDomain: "level-two-project-2025.firebaseapp.com",
  projectId: "level-two-project-2025",
  storageBucket: "level-two-project-2025.appspot.com",
  messagingSenderId: "145312405735",
  appId: "1:145312405735:web:a8234c0983817a23986a42",
  measurementId: "G-XGP885LX3Q"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function getFlightStatus(status) {
    const statusMap = {
        'ON_TIME': 'On Time',
        'DELAYED': 'Delayed',
        'BOARDING': 'Boarding',
        'CANCELLED': 'Cancelled'
    };
    return statusMap[status] || status;
}

function getStatusClass(status) {
    const classMap = {
        'ON_TIME': 'status-on-time',
        'DELAYED': 'status-delayed',
        'BOARDING': 'status-boarding',
        'CANCELLED': 'status-delayed'
    };
    return classMap[status] || 'status-on-time';
}

// Fetch real flight data from Emirates API
async function fetchUpcomingFlights() {
    try {
        const response = await fetch(`${EMIRATES_API.BASE_URL}${EMIRATES_API.FLIGHTS_ENDPOINT}`, {
            headers: API_HEADERS
        });
        if (!response.ok) throw new Error('Failed to fetch flights');
        const data = await response.json();
        return data.map(flight => ({
            flightNumber: flight.id,
            departure: flight.origin.code,
            arrival: flight.destination.code,
            date: new Date(flight.departureTime).toLocaleDateString(),
            time: new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: getFlightStatus(flight.status),
            statusClass: getStatusClass(flight.status),
            aircraft: flight.aircraft.model,
            seat: `${flight.seat.number} (${flight.seat.class})`
        }));
    } catch (error) {
        console.error('Flight API Error:', error);
        return [];
    }
}

// Sample data for recent activity
const recentActivities = [
    { date: "Oct 28, 2023", activity: "Flight EK 412", details: "DXB → LHR (Business)", points: "+5,420" },
    { date: "Oct 22, 2023", activity: "Hotel Stay", details: "JW Marriott, Bangkok", points: "+1,200" },
    { date: "Oct 18, 2023", activity: "Skywards Mall", details: "Apple Store Purchase", points: "+850" },
    { date: "Oct 10, 2023", activity: "Flight EK 925", details: "LHR → DXB (First)", points: "+8,750" },
    { date: "Oct 5, 2023", activity: "Tier Bonus", details: "Platinum Tier Bonus", points: "+15,000" }
];

// Fetch and display user info from Firestore
async function displayUserInfo() {
  // Try both possible localStorage keys for UID
  let userUID = localStorage.getItem('emirateUserUID') || localStorage.getItem('loggedInUserId');
  if (!userUID) {
    window.location.href = 'login.html';
    return;
  }
  const userDocRef = doc(db, 'users', userUID);
  try {
    const userSnap = await getDoc(userDocRef);
    const userInfoDiv = document.getElementById('userInfo');
    if (!userInfoDiv) {
       const dashboard = document.body;
      const newDiv = document.createElement('div');
      newDiv.id = 'userInfo';
      dashboard.insertBefore(newDiv, dashboard.firstChild);
    }
    if (userSnap.exists()) {
      const userData = userSnap.data();
      document.getElementById('userInfo').innerHTML = `
        <h2 class="font-bold text-xl mb-2">Hello, ${userData.firstName} ${userData.lastName}!</h2>
        <p class="text-white-700 mb-1">Email: ${userData.email}</p>
        <p class="text-white-700 mb-1">Title: ${userData.title}</p>
        <p class="text-white-700 mb-1">Country: ${userData.country}</p>
        <p class="text-white-700 mb-1">Language: ${userData.language}</p>
        <p class="text-white-700 mb-1">Mobile: ${userData.mobile}</p>
        <p class="text-white-700 mb-1">Code: ${userData.code}</p>
        <p class="text-white-700 mb-1">Dob: ${userData.dob}</p>
        `;
    } else {
      document.getElementById('userInfo').innerHTML = '<p>User info not found.</p>';
    }
  } catch (err) {
    document.getElementById('userInfo').innerHTML = `<p>Error loading user info: ${err.message}</p>`;
  }
}

function logoutUser() {
  localStorage.removeItem('emirateUserUID');
  localStorage.removeItem('loggedInUserId');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function () {
    // Mobile sidebar toggle
    const openSidebarBtn = document.getElementById('openSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');

    if (openSidebarBtn && closeSidebarBtn && sidebar) {
        openSidebarBtn.addEventListener('click', function () {
            sidebar.classList.add('open');
        });
        closeSidebarBtn.addEventListener('click', function () {
            sidebar.classList.remove('open');
        });
    }

    // Populate upcoming flights from API
    const upcomingFlightsContainer = document.getElementById('upcomingFlights');
    fetchUpcomingFlights().then(flights => {
        flights.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'bg-white rounded-lg shadow p-5 flight-card transition-transform duration-300';
            flightCard.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="font-bold text-lg">${flight.departure} → ${flight.arrival}</h3>
                        <p class="text-sm text-gray-500">${flight.flightNumber} • ${flight.aircraft}</p>
                    </div>
                    <span class="${flight.statusClass} status-badge">${flight.status}</span>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between mb-1">
                        <span class="font-medium">${flight.date}</span>
                        <span class="font-medium">${flight.time}</span>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-emirates-red" style="width: 100%"></div>
                    </div>
                </div>
                <div class="flex justify-between text-sm">
                    <div>
                        <p class="text-gray-500">Seat</p>
                        <p>${flight.seat}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Terminal</p>
                        <p>${flight.departure === 'DXB' ? 'T3' : 'T1'}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Gate</p>
                        <p>${flight.departure === 'DXB' ? 'B7' : 'A4'}</p>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                    <button class="text-emirates-red hover:underline text-sm">Check-in</button>
                    <button class="text-emirates-red hover:underline text-sm">Details</button>
                </div>
            `;
            upcomingFlightsContainer.appendChild(flightCard);
        });
        if (flights.length === 0) {
            upcomingFlightsContainer.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-500">No upcoming flights found</p>
                </div>`;
        }
    });

    // Populate recent activity
    const recentActivityContainer = document.getElementById('recentActivity');
    recentActivities.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${activity.date}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${activity.activity}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${activity.details}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-emirates-red">${activity.points}</td>
        `;
        recentActivityContainer.appendChild(row);
    });

    // Simulate progress bar animation
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(el => {
            const targetWidth = el.style.width;
            el.style.width = '0';
            setTimeout(() => {
                el.style.width = targetWidth;
            }, 100);
        });
    }, 500);

    displayUserInfo();
    const logoutBtn = document.getElementById('logoutButton');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
});
