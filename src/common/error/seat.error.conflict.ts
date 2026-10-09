export class SeatConflictError extends Error {
  constructor() {
    super("One or more seats are no longer available");
    this.name = "SeatConflictError";
  }
}