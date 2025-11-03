export default class SpecVersion {
  private major: number;
  private minor: number;
  private patch: number;

  constructor(private readonly integerVersion: number) {
    const stringVersion = integerVersion.toString();
    const versionLength = stringVersion.length;
    const partLength = Math.ceil(versionLength / 3);
    const paddedVersion = stringVersion.padStart(partLength * 3, '0');
    this.major = parseInt(paddedVersion.slice(0, partLength), 10);
    this.minor = parseInt(paddedVersion.slice(partLength, partLength * 2), 10);
    this.patch = parseInt(paddedVersion.slice(partLength * 2), 10);
  }

  compare(other: SpecVersion): -1 | 0 | 1 {
    if (this.major < other.major) return -1;
    if (this.major > other.major) return 1;
    if (this.minor < other.minor) return -1;
    if (this.minor > other.minor) return 1;
    if (this.patch < other.patch) return -1;
    if (this.patch > other.patch) return 1;
    return 0;
  }

  toString() {
    return this.integerVersion.toString();
  }

  toFormatted() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
}
