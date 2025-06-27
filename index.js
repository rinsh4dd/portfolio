const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.style.display = "block";  // Make sure it's visible
    result.className = "result-message loading";  // Add loading style
    result.innerHTML = "⏳ Please wait...";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status === 200) {
                result.className = "result-message success";
                result.innerHTML = `✅ ${json.message}`;
            } else {
                result.className = "result-message error";
                result.innerHTML = `❌ ${json.message}`;
            }
        })
        .catch(error => {
            console.log(error);
            result.className = "result-message error";
            result.innerHTML = "❌ Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.classList.add("fade-out");
            }, 3000);
        });
});
