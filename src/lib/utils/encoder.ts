const base32LowerCaseAlphabet = 'abcdefghijklmnopqrstuvwxyz234567';
const alphabetLowerCase = '0123456789abcdef';

export function encodeBase32LowerCase(bytes: Uint8Array): string {
	return encodeBase32_internal(bytes, base32LowerCaseAlphabet, EncodingPadding.Include);
}
export function encodeBase32LowerCaseNoPadding(bytes: Uint8Array): string {
	return encodeBase32_internal(bytes, base32LowerCaseAlphabet, EncodingPadding.None);
}

export function encodeHexLowerCase(data: Uint8Array): string {
	let result = '';
	for (let i = 0; i < data.length; i++) {
		result += alphabetLowerCase[data[i] >> 4];
		result += alphabetLowerCase[data[i] & 0x0f];
	}
	return result;
}

export function generateIdFromEntropySize(size: number): string {
	const buffer = crypto.getRandomValues(new Uint8Array(size));
	return encodeBase32_internal(buffer, base32LowerCaseAlphabet, EncodingPadding.None);
}

function encodeBase32_internal(
	bytes: Uint8Array,
	alphabet: string,
	padding: EncodingPadding
): string {
	let result = '';
	for (let i = 0; i < bytes.byteLength; i += 5) {
		let buffer = 0n;
		let bufferBitSize = 0;
		for (let j = 0; j < 5 && i + j < bytes.byteLength; j++) {
			buffer = (buffer << 8n) | BigInt(bytes[i + j]);
			bufferBitSize += 8;
		}
		if (bufferBitSize % 5 !== 0) {
			buffer = buffer << BigInt(5 - (bufferBitSize % 5));
			bufferBitSize += 5 - (bufferBitSize % 5);
		}
		for (let j = 0; j < 8; j++) {
			if (bufferBitSize >= 5) {
				result += alphabet[Number((buffer >> BigInt(bufferBitSize - 5)) & 0x1fn)];
				bufferBitSize -= 5;
			} else if (bufferBitSize > 0) {
				result += alphabet[Number((buffer << BigInt(6 - bufferBitSize)) & 0x3fn)];
				bufferBitSize = 0;
			} else if (padding === EncodingPadding.Include) {
				result += '=';
			}
		}
	}
	return result;
}

enum EncodingPadding {
	Include = 0,
	None
}
