/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CompanyTypeComponentsPage, CompanyTypeDeleteDialog, CompanyTypeUpdatePage } from './company-type.page-object';

const expect = chai.expect;

describe('CompanyType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let companyTypeUpdatePage: CompanyTypeUpdatePage;
    let companyTypeComponentsPage: CompanyTypeComponentsPage;
    let companyTypeDeleteDialog: CompanyTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CompanyTypes', async () => {
        await navBarPage.goToEntity('company-type');
        companyTypeComponentsPage = new CompanyTypeComponentsPage();
        expect(await companyTypeComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.companyType.home.title');
    });

    it('should load create CompanyType page', async () => {
        await companyTypeComponentsPage.clickOnCreateButton();
        companyTypeUpdatePage = new CompanyTypeUpdatePage();
        expect(await companyTypeUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.companyType.home.createOrEditLabel');
        await companyTypeUpdatePage.cancel();
    });

    it('should create and save CompanyTypes', async () => {
        const nbButtonsBeforeCreate = await companyTypeComponentsPage.countDeleteButtons();

        await companyTypeComponentsPage.clickOnCreateButton();
        await promise.all([
            companyTypeUpdatePage.setNameInput('name'),
            companyTypeUpdatePage.setDescriptionInput('description'),
            companyTypeUpdatePage.setMinEmployeesQuantityInput('5'),
            companyTypeUpdatePage.setMaxEmployeesQuantityInput('5')
        ]);
        expect(await companyTypeUpdatePage.getNameInput()).to.eq('name');
        expect(await companyTypeUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await companyTypeUpdatePage.getMinEmployeesQuantityInput()).to.eq('5');
        expect(await companyTypeUpdatePage.getMaxEmployeesQuantityInput()).to.eq('5');
        await companyTypeUpdatePage.save();
        expect(await companyTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await companyTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CompanyType', async () => {
        const nbButtonsBeforeDelete = await companyTypeComponentsPage.countDeleteButtons();
        await companyTypeComponentsPage.clickOnLastDeleteButton();

        companyTypeDeleteDialog = new CompanyTypeDeleteDialog();
        expect(await companyTypeDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.companyType.delete.question');
        await companyTypeDeleteDialog.clickOnConfirmButton();

        expect(await companyTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
