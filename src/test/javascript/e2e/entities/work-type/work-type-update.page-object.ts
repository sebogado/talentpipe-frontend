import { element, by, ElementFinder } from 'protractor';

export default class WorkTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentPipeFrontendApp.workType.home.createOrEditLabel'));
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

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setMinQuantityHoursInput(minQuantityHours) {
    await this.minQuantityHoursInput.sendKeys(minQuantityHours);
  }

  async getMinQuantityHoursInput() {
    return this.minQuantityHoursInput.getAttribute('value');
  }

  async setMaxQuantityHoursInput(maxQuantityHours) {
    await this.maxQuantityHoursInput.sendKeys(maxQuantityHours);
  }

  async getMaxQuantityHoursInput() {
    return this.maxQuantityHoursInput.getAttribute('value');
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
