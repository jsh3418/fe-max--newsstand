import { GridStore, PressLogo } from "../mainView";

export class GridView {
  private gridStore: GridStore;

  private $gridView: HTMLElement = document.createElement("div");
  private $frame: HTMLElement = document.createElement("div");
  private $group: HTMLElement = document.createElement("div");

  constructor(gridStore: GridStore) {
    this.gridStore = gridStore;

    this.initElement();
    this.initRender();
  }

  private initElement() {
    this.$gridView.className = "grid-view";

    this.$frame.className = "grid-view-frame";
    this.$frame.innerHTML = `
      <i class="grid-view-frame__row-frame1"></i>
      <i class="grid-view-frame__row-frame2"></i>
      <i class="grid-view-frame__row-frame3"></i>
      <i class="grid-view-frame__col-frame1"></i>
      <i class="grid-view-frame__col-frame2"></i>
      <i class="grid-view-frame__col-frame3"></i>
      <i class="grid-view-frame__col-frame4"></i>
      <i class="grid-view-frame__col-frame5"></i>`;

    this.$gridView.append(this.$frame);

    this.$group.className = "grid-view-group";
  }

  async initRender() {
    await this.gridStore.fetchPressLogos();
    this.appendPressBoxes();
  }

  private appendPressBoxes() {
    const logos = this.gridStore.getPaginatedLogos();
    const fragment = document.createDocumentFragment();

    logos.forEach((logo) => {
      const pressBox = this.createPressBoxElement(logo);

      fragment.append(pressBox);
    });

    this.$group.append(fragment);
    this.$gridView.append(this.$group);
  }

  private createPressBoxElement(logo: PressLogo) {
    const box = document.createElement("div");
    box.className = "grid-view-group__box";

    const image = document.createElement("img");
    box.className = "grid-view-group__logo";
    image.src = logo.src;
    image.alt = logo.alt;

    box.appendChild(image);

    return box;
  }

  getElement() {
    return this.$gridView;
  }

  prevPageRender() {
    this.gridStore.decreasePage();
    this.clearPressBox();
    this.appendPressBoxes();
  }

  nextPageRender() {
    this.gridStore.increasePage();
    this.clearPressBox();
    this.appendPressBoxes();
  }

  private clearPressBox() {
    this.$group.innerHTML = "";
  }
}