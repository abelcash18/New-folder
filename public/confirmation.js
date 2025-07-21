// confirmation.js
window.onload = function() {
    const flight = JSON.parse(localStorage.getItem('flight') || '{}');
    const passenger = JSON.parse(localStorage.getItem('passenger') || '{}');
    const payment = localStorage.getItem('payment');

    if (!flight.flight || !passenger.name || !payment) {
        document.getElementById('confirmationMessage').innerHTML = '<p>Booking incomplete. Please start again.</p>';
        return;
    }

    document.getElementById('confirmationMessage').innerHTML = `
        <h2>Thank you, ${passenger.name}!</h2>
        <p>Your booking for flight <b>${flight.flight}</b> from <b>${flight.from}</b> to <b>${flight.to}</b> on <b>${flight.date}</b> is confirmed.</p>
        <p>A confirmation email has been sent to <b>${passenger.email}</b>.</p>
    `;

    // Optionally clear storage for next booking
    localStorage.removeItem('flight');
    localStorage.removeItem('passenger');
    localStorage.removeItem('payment');
};