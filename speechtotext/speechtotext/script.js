document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    const status = document.getElementById("status");
    const result = document.getElementById("result");

    let recognition;

    try {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    } catch (e) {
        console.error("SpeechRecognition not supported", e);
        status.textContent = "SpeechRecognition not supported";
        return;
    }

    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        console.log("Recognition started");
        status.textContent = "Listening, please speak...";
    };

    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        console.log("Result received:", transcript);
        result.textContent = transcript;
        status.textContent = "stopped listening";

        // Save the transcript to the database
        saveTranscript(transcript);
    };

    recognition.onerror = function(event) {
        console.error("Error occurred in recognition:", event.error);
        status.textContent = "Error occurred in recognition: " + event.error;
    };

    recognition.onend = function() {
        console.log("Recognition ended");
        status.textContent = "stopped listening";
    };

    startBtn.addEventListener("click", function() {
        console.log("Start button clicked");
        recognition.start();
    });

    function saveTranscript(transcript) {
        fetch('save_transcript.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: transcript }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
