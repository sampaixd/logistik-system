export class AvailableTruckerNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "AvailableTruckerNotFoundError";
    }
}