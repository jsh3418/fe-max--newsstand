import { GridView } from "./gridView/gridView";

export interface PressLogo {
  src: string;
  alt: string;
}

export class MainView {
  $mainView: HTMLElement = document.createElement("section");
  private $leftArrow: HTMLElement = document.createElement("div");
  private $rightArrow: HTMLElement = document.createElement("div");

  private gridStore: GridStore = new GridStore();
  private gridView: GridView = new GridView(this.gridStore);

  constructor() {
    this.initElement();
    this.setEvents();
  }

  initElement() {
    this.$mainView.className = "main-view";
    this.$leftArrow.className = "main-view__left-arrow";
    this.$rightArrow.className = "main-view__right-arrow";

    this.$mainView.append(this.$leftArrow, this.$rightArrow);
    this.$mainView.append(this.gridView.getElement());
  }

  setEvents() {
    this.$leftArrow.addEventListener("click", () => {
      this.gridView.prevPageRender();
      this.updateArrowVisibility();
    });

    this.$rightArrow.addEventListener("click", () => {
      this.gridView.nextPageRender();
      this.updateArrowVisibility();
    });
  }

  updateArrowVisibility() {
    if (this.gridStore.isFirstPage()) {
      this.$leftArrow.className = "main-view__left-arrow--hidden";
    } else {
      this.$leftArrow.className = "main-view__left-arrow";
    }

    if (this.gridStore.isLastPage()) {
      this.$rightArrow.className = "main-view__right-arrow--hidden";
    } else {
      this.$rightArrow.className = "main-view__right-arrow";
    }
  }
}

export class GridStore {
  private logos: PressLogo[] = [];
  private currentPage: number = 1;
  private lastPage: number = 1;
  private ITEM_PER_PAGE: number = 24;

  setLogos(data: PressLogo[]) {
    this.logos = data;
  }

  private setMaxPage(logosLength: number) {
    this.lastPage = Math.ceil(logosLength / this.ITEM_PER_PAGE);
  }

  getPaginatedLogos() {
    return this.logos.slice(
      (this.currentPage - 1) * this.ITEM_PER_PAGE,
      this.currentPage * this.ITEM_PER_PAGE
    );
  }

  increasePage() {
    if (this.currentPage >= this.lastPage) {
      return;
    }

    this.currentPage += 1;
  }

  decreasePage() {
    if (this.currentPage <= 1) {
      return;
    }

    this.currentPage -= 1;
  }

  isFirstPage() {
    return this.currentPage === 1;
  }

  isLastPage() {
    return this.currentPage === this.lastPage;
  }

  async fetchPressLogos() {
    const response = await fetch("http://localhost:8080/press-logos");
    const data = await response.json();

    this.setLogos(data);
    this.setMaxPage(data.length);
  }
}