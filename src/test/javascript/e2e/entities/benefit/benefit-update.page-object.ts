import { element, by, ElementFinder } from 'protractor';

export default class BenefitUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentPipeFrontendApp.benefit.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#benefit-name'));
  normalizedNameInput: ElementFinder = element(by.css('input#benefit-normalizedName'));
  descriptionInput: ElementFinder = element(by.css('input#benefit-description'));

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
