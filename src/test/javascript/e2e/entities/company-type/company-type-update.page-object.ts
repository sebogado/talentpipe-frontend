import { element, by, ElementFinder } from 'protractor';

export default class CompanyTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentpipeApp.companyType.home.createOrEditLabel'));
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

  setMinEmployeesQuantityInput(minEmployeesQuantity) {
    this.minEmployeesQuantityInput.sendKeys(minEmployeesQuantity);
  }

  getMinEmployeesQuantityInput() {
    return this.minEmployeesQuantityInput.getAttribute('value');
  }

  setMaxEmployeesQuantityInput(maxEmployeesQuantity) {
    this.maxEmployeesQuantityInput.sendKeys(maxEmployeesQuantity);
  }

  getMaxEmployeesQuantityInput() {
    return this.maxEmployeesQuantityInput.getAttribute('value');
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
