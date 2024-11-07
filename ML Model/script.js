document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("questionnaireForm");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Gather form data into an object
        const formData = {};
        Array.from(form.elements).forEach(input => {
            if (input.type === "number" && input.name) {  // Ensure input is a number and has a name
                formData[input.name] = parseInt(input.value) || 0;  // Use 0 if value is missing or invalid
            }
        });

        // Send data to backend
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                resultDiv.innerHTML = `<h3>Recommendation</h3><p>${data.recommendation}</p>`;
            } else {
                resultDiv.innerHTML = "<p>There was an error processing your request. Please try again.</p>";
            }
        } catch (error) {
            console.error("Error:", error);
            resultDiv.innerHTML = "<p>Could not connect to the server. Please check if the backend is running and try again later.</p>";
        }
    });
});
