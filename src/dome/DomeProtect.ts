import { DomeMissible } from "./DomeMisseble";
import { Rocket } from "./Rocket";

export class DomeProtect {
  missebles: DomeMissible[];
  radarMap: Rocket[];

  constructor() {}

  render() {
    this.radarMap.forEach((item) => {
      // this.missebles.forEach(item);
    });
  }
}
