import { element, by, ElementFinder } from 'protractor';

export default class CountryUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentPipeFrontendApp.country.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#country-name'));
  normalizedNameInput: ElementFinder = element(by.css('input#country-normalizedName'));
  codeInput: ElementFinder = element(by.css('input#country-code'));
  phoneCodeInput: ElementFinder = element(by.css('input#country-phoneCode'));
  currencyInput: ElementFinder = element(by.css('input#country-currency'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setNormalizedNameInput(normalizedName) {
    await this.normalizedNameInput.sendKeys(normalizedName);
  }

  async getNormalizedNameInput() {
    return this.normalizedNameInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setPhoneCodeInput(phoneCode) {
    await this.phoneCodeInput.sendKeys(phoneCode);
  }

  async getPhoneCodeInput() {
    return this.phoneCodeInput.getAttribute('value');
  }

  async setCurrencyInput(currency) {
    await this.currencyInput.sendKeys(currency);
  }

  async getCurrencyInput() {
    return this.currencyInput.getAttribute('value');
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
