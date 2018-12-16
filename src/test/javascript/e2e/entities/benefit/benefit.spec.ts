/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BenefitComponentsPage, BenefitDeleteDialog, BenefitUpdatePage } from './benefit.page-object';

const expect = chai.expect;

describe('Benefit e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let benefitUpdatePage: BenefitUpdatePage;
    let benefitComponentsPage: BenefitComponentsPage;
    let benefitDeleteDialog: BenefitDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Benefits', async () => {
        await navBarPage.goToEntity('benefit');
        benefitComponentsPage = new BenefitComponentsPage();
        expect(await benefitComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.benefit.home.title');
    });

    it('should load create Benefit page', async () => {
        await benefitComponentsPage.clickOnCreateButton();
        benefitUpdatePage = new BenefitUpdatePage();
        expect(await benefitUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.benefit.home.createOrEditLabel');
        await benefitUpdatePage.cancel();
    });

    it('should create and save Benefits', async () => {
        const nbButtonsBeforeCreate = await benefitComponentsPage.countDeleteButtons();

        await benefitComponentsPage.clickOnCreateButton();
        await promise.all([benefitUpdatePage.setNameInput('name'), benefitUpdatePage.setDescriptionInput('description')]);
        expect(await benefitUpdatePage.getNameInput()).to.eq('name');
        expect(await benefitUpdatePage.getDescriptionInput()).to.eq('description');
        await benefitUpdatePage.save();
        expect(await benefitUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await benefitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Benefit', async () => {
        const nbButtonsBeforeDelete = await benefitComponentsPage.countDeleteButtons();
        await benefitComponentsPage.clickOnLastDeleteButton();

        benefitDeleteDialog = new BenefitDeleteDialog();
        expect(await benefitDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.benefit.delete.question');
        await benefitDeleteDialog.clickOnConfirmButton();

        expect(await benefitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
