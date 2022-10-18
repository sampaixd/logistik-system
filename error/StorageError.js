export class StorageError extends Error {
    constructor(message) {
        super(message);
        this.name = "StorageError";
    }
}