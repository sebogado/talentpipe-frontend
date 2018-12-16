/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StateBeforeTaxComponentsPage, StateBeforeTaxDeleteDialog, StateBeforeTaxUpdatePage } from './state-before-tax.page-object';

const expect = chai.expect;

describe('StateBeforeTax e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let stateBeforeTaxUpdatePage: StateBeforeTaxUpdatePage;
    let stateBeforeTaxComponentsPage: StateBeforeTaxComponentsPage;
    let stateBeforeTaxDeleteDialog: StateBeforeTaxDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load StateBeforeTaxes', async () => {
        await navBarPage.goToEntity('state-before-tax');
        stateBeforeTaxComponentsPage = new StateBeforeTaxComponentsPage();
        expect(await stateBeforeTaxComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.stateBeforeTax.home.title');
    });

    it('should load create StateBeforeTax page', async () => {
        await stateBeforeTaxComponentsPage.clickOnCreateButton();
        stateBeforeTaxUpdatePage = new StateBeforeTaxUpdatePage();
        expect(await stateBeforeTaxUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.stateBeforeTax.home.createOrEditLabel');
        await stateBeforeTaxUpdatePage.cancel();
    });

    it('should create and save StateBeforeTaxes', async () => {
        const nbButtonsBeforeCreate = await stateBeforeTaxComponentsPage.countDeleteButtons();

        await stateBeforeTaxComponentsPage.clickOnCreateButton();
        await promise.all([stateBeforeTaxUpdatePage.setNameInput('name'), stateBeforeTaxUpdatePage.setDescriptionInput('description')]);
        expect(await stateBeforeTaxUpdatePage.getNameInput()).to.eq('name');
        expect(await stateBeforeTaxUpdatePage.getDescriptionInput()).to.eq('description');
        await stateBeforeTaxUpdatePage.save();
        expect(await stateBeforeTaxUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await stateBeforeTaxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last StateBeforeTax', async () => {
        const nbButtonsBeforeDelete = await stateBeforeTaxComponentsPage.countDeleteButtons();
        await stateBeforeTaxComponentsPage.clickOnLastDeleteButton();

        stateBeforeTaxDeleteDialog = new StateBeforeTaxDeleteDialog();
        expect(await stateBeforeTaxDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.stateBeforeTax.delete.question');
        await stateBeforeTaxDeleteDialog.clickOnConfirmButton();

        expect(await stateBeforeTaxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
