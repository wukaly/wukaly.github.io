document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("contact-toggle");
    const contactWrapper = document.getElementById("contact-wrapper");

    toggleButton.addEventListener("click", () => {
        contactWrapper.classList.add("show");
        toggleButton.classList.add("hidden");

        setTimeout(() => {
            contactWrapper.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 300);
    });

    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mandjapg", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.textContent = "Thanks! Your message has been sent.";
                form.reset();
            } else {
                status.textContent = "Oops! Something went wrong.";
            }
        } catch (error) {
            status.textContent = "Network error. Please try again.";
        }
    });

    const typedName = document.getElementById('typed-name');
    const texts = ["Luke Trover", "wukaly"];
    let current = 0;

    function typeWriter(text, callback) {
        let i = 0;
        typedName.textContent = "";
        const typingInterval = setInterval(() => {
            typedName.textContent += text[i];
            i++;
            if (i === text.length) {
                clearInterval(typingInterval);
                // Random delay before next action
                setTimeout(callback, Math.random() * 5000 + 5000); // 1–3 sec
            }
        }, 150);
    }

    function deleteWriter(callback) {
        const deletingInterval = setInterval(() => {
            typedName.textContent = typedName.textContent.slice(0, -1);
            if (typedName.textContent.length === 0) {
                clearInterval(deletingInterval);
                // Random delay before next action
                setTimeout(callback, Math.random() * 2000 + 500); // 0.5–2.5 sec
            }
        }, 100);
    }

    function loop() {
        const nextText = texts[current];
        typeWriter(nextText, () => {
            deleteWriter(() => {
                current = (current + 1) % texts.length;
                loop();
            });
        });
    }

    loop();
});
