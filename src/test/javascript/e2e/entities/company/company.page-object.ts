import { element, by, ElementFinder } from 'protractor';

export class CompanyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-company div table .btn-danger'));
    title = element.all(by.css('jhi-company div h2#page-heading span')).first();

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

export class CompanyUpdatePage {
    pageTitle = element(by.id('jhi-company-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    taxNameInput = element(by.id('field_taxName'));
    taxIdInput = element(by.id('field_taxId'));
    emailInput = element(by.id('field_email'));
    nameInput = element(by.id('field_name'));
    streetInput = element(by.id('field_street'));
    floorInput = element(by.id('field_floor'));
    numberInput = element(by.id('field_number'));
    apartmentInput = element(by.id('field_apartment'));
    postalCodeInput = element(by.id('field_postalCode'));
    phoneInput = element(by.id('field_phone'));
    contactNameInput = element(by.id('field_contactName'));
    mainUserSelect = element(by.id('field_mainUser'));
    sectorSelect = element(by.id('field_sector'));
    citySelect = element(by.id('field_city'));
    companyTypeSelect = element(by.id('field_companyType'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTaxNameInput(taxName) {
        await this.taxNameInput.sendKeys(taxName);
    }

    async getTaxNameInput() {
        return this.taxNameInput.getAttribute('value');
    }

    async setTaxIdInput(taxId) {
        await this.taxIdInput.sendKeys(taxId);
    }

    async getTaxIdInput() {
        return this.taxIdInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setStreetInput(street) {
        await this.streetInput.sendKeys(street);
    }

    async getStreetInput() {
        return this.streetInput.getAttribute('value');
    }

    async setFloorInput(floor) {
        await this.floorInput.sendKeys(floor);
    }

    async getFloorInput() {
        return this.floorInput.getAttribute('value');
    }

    async setNumberInput(number) {
        await this.numberInput.sendKeys(number);
    }

    async getNumberInput() {
        return this.numberInput.getAttribute('value');
    }

    async setApartmentInput(apartment) {
        await this.apartmentInput.sendKeys(apartment);
    }

    async getApartmentInput() {
        return this.apartmentInput.getAttribute('value');
    }

    async setPostalCodeInput(postalCode) {
        await this.postalCodeInput.sendKeys(postalCode);
    }

    async getPostalCodeInput() {
        return this.postalCodeInput.getAttribute('value');
    }

    async setPhoneInput(phone) {
        await this.phoneInput.sendKeys(phone);
    }

    async getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    async setContactNameInput(contactName) {
        await this.contactNameInput.sendKeys(contactName);
    }

    async getContactNameInput() {
        return this.contactNameInput.getAttribute('value');
    }

    async mainUserSelectLastOption() {
        await this.mainUserSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async mainUserSelectOption(option) {
        await this.mainUserSelect.sendKeys(option);
    }

    getMainUserSelect(): ElementFinder {
        return this.mainUserSelect;
    }

    async getMainUserSelectedOption() {
        return this.mainUserSelect.element(by.css('option:checked')).getText();
    }

    async sectorSelectLastOption() {
        await this.sectorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async sectorSelectOption(option) {
        await this.sectorSelect.sendKeys(option);
    }

    getSectorSelect(): ElementFinder {
        return this.sectorSelect;
    }

    async getSectorSelectedOption() {
        return this.sectorSelect.element(by.css('option:checked')).getText();
    }

    async citySelectLastOption() {
        await this.citySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async citySelectOption(option) {
        await this.citySelect.sendKeys(option);
    }

    getCitySelect(): ElementFinder {
        return this.citySelect;
    }

    async getCitySelectedOption() {
        return this.citySelect.element(by.css('option:checked')).getText();
    }

    async companyTypeSelectLastOption() {
        await this.companyTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async companyTypeSelectOption(option) {
        await this.companyTypeSelect.sendKeys(option);
    }

    getCompanyTypeSelect(): ElementFinder {
        return this.companyTypeSelect;
    }

    async getCompanyTypeSelectedOption() {
        return this.companyTypeSelect.element(by.css('option:checked')).getText();
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

export class CompanyDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-company-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-company'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
