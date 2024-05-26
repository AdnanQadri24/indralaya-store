class UIController {
  constructor() {
    this.navbarNav = document.querySelector('.navbar-nav');
    this.searchForm = document.querySelector('.search-form');
    this.searchBox = document.querySelector('#search-box');
    this.shoppingCart = document.querySelector('.shopping-cart');
    this.itemDetailModal = document.querySelector('#item-detail-modal');
    this.itemDetailButtons = document.querySelectorAll('.item-detail-button');
    this.initEventListeners();
  }

  initEventListeners() {
    document.querySelector('#hamburger-menu').onclick = () => this.toggleNavbar();
    document.querySelector('#search-button').onclick = (e) => this.toggleSearchForm(e);
    document.querySelector('#shopping-cart-button').onclick = (e) => this.toggleShoppingCart(e);
    document.addEventListener('click', (e) => this.handleClickOutside(e));
    this.itemDetailButtons.forEach((btn) => {
      btn.onclick = (e) => this.showItemDetailModal(e);
    });
    document.querySelector('.modal .close-icon').onclick = (e) => this.hideItemDetailModal(e);
    window.onclick = (e) => this.windowOnClick(e);
  }

  toggleNavbar() {
    this.navbarNav.classList.toggle('active');
  }

  toggleSearchForm(e) {
    this.searchForm.classList.toggle('active');
    this.searchBox.focus();
    e.preventDefault();
  }

  toggleShoppingCart(e) {
    this.shoppingCart.classList.toggle('active');
    e.preventDefault();
  }

  handleClickOutside(e) {
    if (!document.querySelector('#hamburger-menu').contains(e.target) && !this.navbarNav.contains(e.target)) {
      this.navbarNav.classList.remove('active');
    }
    if (!document.querySelector('#search-button').contains(e.target) && !this.searchForm.contains(e.target)) {
      this.searchForm.classList.remove('active');
    }
    if (!document.querySelector('#shopping-cart-button').contains(e.target) && !this.shoppingCart.contains(e.target)) {
      this.shoppingCart.classList.remove('active');
    }
  }

  showItemDetailModal(e) {
    this.itemDetailModal.style.display = 'flex';
    e.preventDefault();
  }

  hideItemDetailModal(e) {
    this.itemDetailModal.style.display = 'none';
    e.preventDefault();
  }

  windowOnClick(e) {
    if (e.target === this.itemDetailModal) {
      this.itemDetailModal.style.display = 'none';
    }
  }
}

// Membuat instance dari UIController
const uiController = new UIController();