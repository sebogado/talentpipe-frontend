import { element, by, ElementFinder } from 'protractor';

export default class RecruiterUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentPipeFrontendApp.recruiter.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#recruiter-name'));
  lastNameInput: ElementFinder = element(by.css('input#recruiter-lastName'));
  emailInput: ElementFinder = element(by.css('input#recruiter-email'));
  taxIdInput: ElementFinder = element(by.css('input#recruiter-taxId'));
  phoneInput: ElementFinder = element(by.css('input#recruiter-phone'));
  streetInput: ElementFinder = element(by.css('input#recruiter-street'));
  numberInput: ElementFinder = element(by.css('input#recruiter-number'));
  floorInput: ElementFinder = element(by.css('input#recruiter-floor'));
  apartmentInput: ElementFinder = element(by.css('input#recruiter-apartment'));
  citySelect: ElementFinder = element(by.css('select#recruiter-city'));
  sectorSelect: ElementFinder = element(by.css('select#recruiter-sector'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setTaxIdInput(taxId) {
    await this.taxIdInput.sendKeys(taxId);
  }

  async getTaxIdInput() {
    return this.taxIdInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setStreetInput(street) {
    await this.streetInput.sendKeys(street);
  }

  async getStreetInput() {
    return this.streetInput.getAttribute('value');
  }

  async setNumberInput(number) {
    await this.numberInput.sendKeys(number);
  }

  async getNumberInput() {
    return this.numberInput.getAttribute('value');
  }

  async setFloorInput(floor) {
    await this.floorInput.sendKeys(floor);
  }

  async getFloorInput() {
    return this.floorInput.getAttribute('value');
  }

  async setApartmentInput(apartment) {
    await this.apartmentInput.sendKeys(apartment);
  }

  async getApartmentInput() {
    return this.apartmentInput.getAttribute('value');
  }

  async citySelectLastOption() {
    await this.citySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async citySelectOption(option) {
    await this.citySelect.sendKeys(option);
  }

  getCitySelect() {
    return this.citySelect;
  }

  async getCitySelectedOption() {
    return this.citySelect.element(by.css('option:checked')).getText();
  }

  async sectorSelectLastOption() {
    await this.sectorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sectorSelectOption(option) {
    await this.sectorSelect.sendKeys(option);
  }

  getSectorSelect() {
    return this.sectorSelect;
  }

  async getSectorSelectedOption() {
    return this.sectorSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
