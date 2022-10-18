export class AvailableWorkerNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "AvailableWorkerNotFoundError";
    }
}