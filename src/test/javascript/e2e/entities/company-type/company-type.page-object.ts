import { element, by, ElementFinder } from 'protractor';

export class CompanyTypeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-company-type div table .btn-danger'));
    title = element.all(by.css('jhi-company-type div h2#page-heading span')).first();

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

export class CompanyTypeUpdatePage {
    pageTitle = element(by.id('jhi-company-type-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    minEmployeesQuantityInput = element(by.id('field_minEmployeesQuantity'));
    maxEmployeesQuantityInput = element(by.id('field_maxEmployeesQuantity'));

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

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class CompanyTypeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-companyType-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-companyType'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
