import { element, by, ElementFinder } from 'protractor';

export default class CompanyUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentPipeFrontendApp.company.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  taxNameInput: ElementFinder = element(by.css('input#company-taxName'));
  taxIdInput: ElementFinder = element(by.css('input#company-taxId'));
  emailInput: ElementFinder = element(by.css('input#company-email'));
  nameInput: ElementFinder = element(by.css('input#company-name'));
  streetInput: ElementFinder = element(by.css('input#company-street'));
  floorInput: ElementFinder = element(by.css('input#company-floor'));
  numberInput: ElementFinder = element(by.css('input#company-number'));
  apartmentInput: ElementFinder = element(by.css('input#company-apartment'));
  postalCodeInput: ElementFinder = element(by.css('input#company-postalCode'));
  phoneInput: ElementFinder = element(by.css('input#company-phone'));
  contactNameInput: ElementFinder = element(by.css('input#company-contactName'));
  mainUserSelect: ElementFinder = element(by.css('select#company-mainUser'));
  sectorSelect: ElementFinder = element(by.css('select#company-sector'));
  citySelect: ElementFinder = element(by.css('select#company-city'));
  companyTypeSelect: ElementFinder = element(by.css('select#company-companyType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTaxNameInput(taxName) {
    await this.taxNameInput.sendKeys(taxName);
  }

  async getTaxNameInput() {
    return this.taxNameInput.getAttribute('value');
  }

  async setTaxIdInput(taxId) {
    await this.taxIdInput.sendKeys(taxId);
  }

  async getTaxIdInput() {
    return this.taxIdInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setStreetInput(street) {
    await this.streetInput.sendKeys(street);
  }

  async getStreetInput() {
    return this.streetInput.getAttribute('value');
  }

  async setFloorInput(floor) {
    await this.floorInput.sendKeys(floor);
  }

  async getFloorInput() {
    return this.floorInput.getAttribute('value');
  }

  async setNumberInput(number) {
    await this.numberInput.sendKeys(number);
  }

  async getNumberInput() {
    return this.numberInput.getAttribute('value');
  }

  async setApartmentInput(apartment) {
    await this.apartmentInput.sendKeys(apartment);
  }

  async getApartmentInput() {
    return this.apartmentInput.getAttribute('value');
  }

  async setPostalCodeInput(postalCode) {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput() {
    return this.postalCodeInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setContactNameInput(contactName) {
    await this.contactNameInput.sendKeys(contactName);
  }

  async getContactNameInput() {
    return this.contactNameInput.getAttribute('value');
  }

  async mainUserSelectLastOption() {
    await this.mainUserSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mainUserSelectOption(option) {
    await this.mainUserSelect.sendKeys(option);
  }

  getMainUserSelect() {
    return this.mainUserSelect;
  }

  async getMainUserSelectedOption() {
    return this.mainUserSelect.element(by.css('option:checked')).getText();
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

  async companyTypeSelectLastOption() {
    await this.companyTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async companyTypeSelectOption(option) {
    await this.companyTypeSelect.sendKeys(option);
  }

  getCompanyTypeSelect() {
    return this.companyTypeSelect;
  }

  async getCompanyTypeSelectedOption() {
    return this.companyTypeSelect.element(by.css('option:checked')).getText();
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
