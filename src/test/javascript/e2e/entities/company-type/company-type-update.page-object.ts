import { element, by, ElementFinder } from 'protractor';

export default class CompanyTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentPipeFrontendApp.companyType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#company-type-name'));
  normalizedNameInput: ElementFinder = element(by.css('input#company-type-normalizedName'));
  descriptionInput: ElementFinder = element(by.css('input#company-type-description'));
  minEmployeesQuantityInput: ElementFinder = element(by.css('input#company-type-minEmployeesQuantity'));
  maxEmployeesQuantityInput: ElementFinder = element(by.css('input#company-type-maxEmployeesQuantity'));

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

  async setMinEmployeesQuantityInput(minEmployeesQuantity) {
    await this.minEmployeesQuantityInput.sendKeys(minEmployeesQuantity);
  }

  async getMinEmployeesQuantityInput() {
    return this.minEmployeesQuantityInput.getAttribute('value');
  }

  async setMaxEmployeesQuantityInput(maxEmployeesQuantity) {
    await this.maxEmployeesQuantityInput.sendKeys(maxEmployeesQuantity);
  }

  async getMaxEmployeesQuantityInput() {
    return this.maxEmployeesQuantityInput.getAttribute('value');
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
