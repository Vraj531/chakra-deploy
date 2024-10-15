export async function sha256(data: ArrayBuffer | TypedArray): Promise<ArrayBuffer> {
	return await crypto.subtle.digest('SHA-256', data);
}

type TypedArray =
	| Uint8Array
	| Int8Array
	| Uint16Array
	| Int16Array
	| Uint32Array
	| Int32Array
	| Float32Array
	| Float64Array
	| BigInt64Array
	| BigUint64Array;
