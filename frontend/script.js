document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('rsvpForm');
    const guestList = document.getElementById('guestList');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const attendance = document.getElementById('attendance').value;

        if (!name || !email) {
            alert("Hold up! We need your name and email to RSVP.");
            return;
        }

        if (attendance === "" || attendance === "no") {
            alert("No worries! If you change your mind, we'll save a sparkly seat! ✨");
            return;
        }

        const guest = {
            name: name,
            email: email,
            attendance: attendance // sends "yes", "maybe", or "no"
        };
        

        fetch("http://localhost:8081/api/guests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(guest)
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to RSVP");
            return response.json();
        })
        .then(data => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${name}</strong> is <em>${attendance}</em> for the party! 🎊`;
            li.classList.add('fade-in');
            guestList.appendChild(li);

            funPopup(name);
            launchEmojiConfetti();
            form.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Oops! Couldn't reach the server.");
        });
    });

    // Fade animation for new guest entry
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            animation: fadeInPop 0.7s ease;
        }
        @keyframes fadeInPop {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    function funPopup(name) {
        const messages = [
            `Yay! ${name}, your vibes are officially on the guest list! 💃`,
            `You're in, ${name}! Let's make it legendary 🎉`,
            `Confirmed! ${name} is ready to party! 🥳`,
            `Welcome aboard, ${name}! 🌟`,
            `Heck yeah, ${name}! RSVP magic confirmed 💌`
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        alert(randomMsg);
    }

    function launchEmojiConfetti() {
        for (let i = 0; i < 10; i++) {
            const emoji = document.createElement('div');
            emoji.textContent = ['🎉', '✨', '🥳', '🎊'][Math.floor(Math.random() * 4)];
            emoji.classList.add('confetti');
            emoji.style.position = 'absolute';
            emoji.style.left = `${Math.random() * 100}vw`;
            emoji.style.top = `${Math.random() * 10 + 70}vh`;
            emoji.style.fontSize = `${1 + Math.random() * 1.5}rem`;
            emoji.style.animation = `drop ${2 + Math.random() * 1}s ease forwards`;
            document.body.appendChild(emoji);

            setTimeout(() => emoji.remove(), 2000);
        }
    }

    // Drop animation for confetti
    const confettiStyle = document.createElement('style');
    confettiStyle.innerHTML = `
        @keyframes drop {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(confettiStyle);
});
