import { element, by, ElementFinder } from 'protractor';

export class SearchRequestComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-search-request div table .btn-danger'));
    title = element.all(by.css('jhi-search-request div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SearchRequestUpdatePage {
    pageTitle = element(by.id('jhi-search-request-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    minSalaryInput = element(by.id('field_minSalary'));
    maxSalaryInput = element(by.id('field_maxSalary'));
    positionInput = element(by.id('field_position'));
    companySelect = element(by.id('field_company'));
    ExpertiseLevelSelect = element(by.id('field_ExpertiseLevel'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setMinSalaryInput(minSalary) {
        await this.minSalaryInput.sendKeys(minSalary);
    }

    async getMinSalaryInput() {
        return this.minSalaryInput.getAttribute('value');
    }

    async setMaxSalaryInput(maxSalary) {
        await this.maxSalaryInput.sendKeys(maxSalary);
    }

    async getMaxSalaryInput() {
        return this.maxSalaryInput.getAttribute('value');
    }

    async setPositionInput(position) {
        await this.positionInput.sendKeys(position);
    }

    async getPositionInput() {
        return this.positionInput.getAttribute('value');
    }

    async companySelectLastOption() {
        await this.companySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async companySelectOption(option) {
        await this.companySelect.sendKeys(option);
    }

    getCompanySelect(): ElementFinder {
        return this.companySelect;
    }

    async getCompanySelectedOption() {
        return this.companySelect.element(by.css('option:checked')).getText();
    }

    async ExpertiseLevelSelectLastOption() {
        await this.ExpertiseLevelSelect.all(by.tagName('option'))
            .last()
            .click();
    }

    async ExpertiseLevelSelectOption(option) {
        await this.ExpertiseLevelSelect.sendKeys(option);
    }

    getExpertiseLevelSelect(): ElementFinder {
        return this.ExpertiseLevelSelect;
    }

    async getExpertiseLevelSelectedOption() {
        return this.ExpertiseLevelSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class SearchRequestDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-searchRequest-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-searchRequest'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
