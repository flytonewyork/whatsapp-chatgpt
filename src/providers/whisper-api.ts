import config from "../config";

async function transcribeWhisperApi(audioBlob: Blob): Promise<{ text: string; language: string }> {
	const url = config.whisperServerUrl;

	console.log("Transcribing audio with Whisper API...", audioBlob);

	// FormData
	const formData = new FormData();
	formData.append("file", audioBlob);
	formData.append("diarization", "false");
	formData.append("numSpeakers", "1");
	formData.append("fileType", "ogg");
	if (config.transcriptionLanguage) {
		formData.append("language", config.transcriptionLanguage);
	}
	formData.append("task", "transcribe");

	// Request options
	const options = {
		method: "POST",
		body: formData
	};

	console.log("Sending request to URL:", url);
	console.log("Request options:", options);

	try {
		const response = await fetch(url, options);
		console.log("Received response from server:", response);

		const transcription = await response.json();
		console.log("Parsed response data:", transcription);

		return transcription;
	} catch (error) {
		console.error("Error transcribing audio with Whisper API:", error);
		throw error;
	}
}

export { transcribeWhisperApi };
