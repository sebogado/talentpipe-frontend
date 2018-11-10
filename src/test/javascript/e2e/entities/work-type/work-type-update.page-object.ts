import { element, by, ElementFinder } from 'protractor';

export default class WorkTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentpipeApp.workType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#work-type-name'));
  normalizedNameInput: ElementFinder = element(by.css('input#work-type-normalizedName'));
  descriptionInput: ElementFinder = element(by.css('input#work-type-description'));
  minQuantityHoursInput: ElementFinder = element(by.css('input#work-type-minQuantityHours'));
  maxQuantityHoursInput: ElementFinder = element(by.css('input#work-type-maxQuantityHours'));

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

  setMinQuantityHoursInput(minQuantityHours) {
    this.minQuantityHoursInput.sendKeys(minQuantityHours);
  }

  getMinQuantityHoursInput() {
    return this.minQuantityHoursInput.getAttribute('value');
  }

  setMaxQuantityHoursInput(maxQuantityHours) {
    this.maxQuantityHoursInput.sendKeys(maxQuantityHours);
  }

  getMaxQuantityHoursInput() {
    return this.maxQuantityHoursInput.getAttribute('value');
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
