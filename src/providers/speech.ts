import config from "../config";

/**
 * @param text The sentence to be converted to speech
 * @returns Audio buffer
 */
async function ttsRequest(text: string): Promise<Buffer | null> {
	const url = config.speechServerUrl + "/tts";

	// Request options
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			text
		})
	};

	try {
		const response = await fetch(url, options);
		const audioBuffer = await response.arrayBuffer();
		return Buffer.from(audioBuffer);
	} catch (error) {
		console.error("An error occured (TTS request)", error);
		return null;
	}
}

/**
 * @param audioBlob The audio blob to be transcribed
 * @returns Response: { text: string, language: string }
 */
async function transcribeRequest(audioBlob: Blob): Promise<{ text: string; language: string }> {
	const url = config.speechServerUrl + "/transcribe";
	console.log("Transcribing audio with Speech API...", audioBlob);

	// FormData
	const formData = new FormData();
	formData.append("audio", audioBlob);

	// Request options
	const options = {
		method: "POST",
		body: formData,
		headers: {
			"Content-Type": "multipart/form-data"
		}
	};
	console.log("Sending request to URL:", url);
	try {
		const response = await fetch(url, options);
		console.log("Received response from server:", response);
		const transcription = await response.json();
		console.log("Parsed response data:", transcription);
		return transcription;
	} catch (error) {
		console.error("An error occured (Transcribe request)", error);
		return { text: "Sorry", language: "english" };
	}
}

export { ttsRequest, transcribeRequest };
