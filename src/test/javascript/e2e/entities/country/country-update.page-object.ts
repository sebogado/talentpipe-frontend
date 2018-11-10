import { element, by, ElementFinder } from 'protractor';

export default class CountryUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentpipeApp.country.home.createOrEditLabel'));
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

  setNameInput(name) {
    this.nameInput.sendKeys(name);
  }

  getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  setNormalizedNameInput(normalizedName) {
    this.normalizedNameInput.sendKeys(normalizedName);
  }

  getNormalizedNameInput() {
    return this.normalizedNameInput.getAttribute('value');
  }

  setCodeInput(code) {
    this.codeInput.sendKeys(code);
  }

  getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  setPhoneCodeInput(phoneCode) {
    this.phoneCodeInput.sendKeys(phoneCode);
  }

  getPhoneCodeInput() {
    return this.phoneCodeInput.getAttribute('value');
  }

  setCurrencyInput(currency) {
    this.currencyInput.sendKeys(currency);
  }

  getCurrencyInput() {
    return this.currencyInput.getAttribute('value');
  }

  save() {
    return this.saveButton.click();
  }

  cancel() {
    this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
