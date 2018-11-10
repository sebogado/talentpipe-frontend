import { element, by, ElementFinder } from 'protractor';

export default class SearchTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentpipeApp.searchType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#search-type-name'));
  normalizedNameInput: ElementFinder = element(by.css('input#search-type-normalizedName'));
  descriptionInput: ElementFinder = element(by.css('input#search-type-description'));

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

  setDescriptionInput(description) {
    this.descriptionInput.sendKeys(description);
  }

  getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
