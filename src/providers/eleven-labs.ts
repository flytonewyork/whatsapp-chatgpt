import axios from "axios";

/**
 * @param text The sentence to be converted to speech
 * @returns Audio buffer
 */
async function ttsRequest(text: string): Promise<Buffer | null> {
	const voice_settings = {
		stability: 0.75,
		similarity_boost: 0.75
	};
	// Make sure to remove any non-text like javascript
	let plainText = text.replace(/```[\s\S]*?```/g, ""); // remove any triple backtick code blocks and their content
	plainText = plainText.replace(/`([^`]+)`/g, "$1"); // remove any inline code blocks
	let words = plainText.split(" ");
	let trunc = words.slice(0, 100).join(" ");
	console.log("trunc", trunc);

	const url = "https://api.elevenlabs.io/v1/text-to-speech/9VeabD8xbk78nPaN5KOY";
	const body = JSON.stringify({
		text,
		voice_settings
	});
	try {
		const response = await axios.post(url, body, {
			responseType: "arraybuffer",
			headers: {
				accept: "audio/mpeg",
				"Content-Type": "application/json",
				"xi-api-key": "6b2e1af754fb79485a93b5fc47c9675c"
			},
			method: "POST"
		});
		return Buffer.from(response.data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching audio:", error);
			const results = error.message;
		} else {
			console.error("Error fetching audio:", error);
		}
	}
	return null;
}

export { ttsRequest };
