import { element, by, ElementFinder } from 'protractor';

export default class TechnicalSkillUpdatePage {
  pageTitle: ElementFinder = element(by.id('talentpipeApp.technicalSkill.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#technical-skill-name'));
  normalizedNameInput: ElementFinder = element(by.css('input#technical-skill-normalizedName'));
  descriptionInput: ElementFinder = element(by.css('input#technical-skill-description'));

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
