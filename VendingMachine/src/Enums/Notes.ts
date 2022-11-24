import IMoney, { money } from "../Interfaces/IMoney";

export default class Notes implements IMoney {
  static readonly TWENTY_DOLLARS = 2000;
  static readonly FIFTY_DOLLARS = 5000;

  get values(): money[] {
    return [
      { name: "FIFTY_DOLLARS", value: Notes.FIFTY_DOLLARS },
      { name: "TWENTY_DOLLARS", value: Notes.TWENTY_DOLLARS },
    ];
  }

  getValue(nameOfNote: string): number {
    switch (nameOfNote) {
      case "TWENTY_DOLLARS":
        return 2000;
      case "FIFTY_DOLLARS":
        return 5000;
      default:
        return 0;
    }
  }
}
