/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CompanyComponentsPage, CompanyDeleteDialog, CompanyUpdatePage } from './company.page-object';

const expect = chai.expect;

describe('Company e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let companyUpdatePage: CompanyUpdatePage;
    let companyComponentsPage: CompanyComponentsPage;
    /*let companyDeleteDialog: CompanyDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Companies', async () => {
        await navBarPage.goToEntity('company');
        companyComponentsPage = new CompanyComponentsPage();
        expect(await companyComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.company.home.title');
    });

    it('should load create Company page', async () => {
        await companyComponentsPage.clickOnCreateButton();
        companyUpdatePage = new CompanyUpdatePage();
        expect(await companyUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.company.home.createOrEditLabel');
        await companyUpdatePage.cancel();
    });

    /* it('should create and save Companies', async () => {
        const nbButtonsBeforeCreate = await companyComponentsPage.countDeleteButtons();

        await companyComponentsPage.clickOnCreateButton();
        await promise.all([
            companyUpdatePage.setTaxNameInput('taxName'),
            companyUpdatePage.setTaxIdInput('taxId'),
            companyUpdatePage.setEmailInput('email'),
            companyUpdatePage.setNameInput('name'),
            companyUpdatePage.setStreetInput('street'),
            companyUpdatePage.setFloorInput('5'),
            companyUpdatePage.setNumberInput('5'),
            companyUpdatePage.setApartmentInput('apartment'),
            companyUpdatePage.setPostalCodeInput('postalCode'),
            companyUpdatePage.setPhoneInput('phone'),
            companyUpdatePage.setContactNameInput('contactName'),
            companyUpdatePage.mainUserSelectLastOption(),
            companyUpdatePage.sectorSelectLastOption(),
            companyUpdatePage.citySelectLastOption(),
            companyUpdatePage.companyTypeSelectLastOption(),
        ]);
        expect(await companyUpdatePage.getTaxNameInput()).to.eq('taxName');
        expect(await companyUpdatePage.getTaxIdInput()).to.eq('taxId');
        expect(await companyUpdatePage.getEmailInput()).to.eq('email');
        expect(await companyUpdatePage.getNameInput()).to.eq('name');
        expect(await companyUpdatePage.getStreetInput()).to.eq('street');
        expect(await companyUpdatePage.getFloorInput()).to.eq('5');
        expect(await companyUpdatePage.getNumberInput()).to.eq('5');
        expect(await companyUpdatePage.getApartmentInput()).to.eq('apartment');
        expect(await companyUpdatePage.getPostalCodeInput()).to.eq('postalCode');
        expect(await companyUpdatePage.getPhoneInput()).to.eq('phone');
        expect(await companyUpdatePage.getContactNameInput()).to.eq('contactName');
        await companyUpdatePage.save();
        expect(await companyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await companyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Company', async () => {
        const nbButtonsBeforeDelete = await companyComponentsPage.countDeleteButtons();
        await companyComponentsPage.clickOnLastDeleteButton();

        companyDeleteDialog = new CompanyDeleteDialog();
        expect(await companyDeleteDialog.getDialogTitle())
            .to.eq('talentpipeFrontendApp.company.delete.question');
        await companyDeleteDialog.clickOnConfirmButton();

        expect(await companyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
