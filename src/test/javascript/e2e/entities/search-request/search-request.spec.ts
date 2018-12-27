/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SearchRequestComponentsPage, SearchRequestDeleteDialog, SearchRequestUpdatePage } from './search-request.page-object';

const expect = chai.expect;

describe('SearchRequest e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let searchRequestUpdatePage: SearchRequestUpdatePage;
    let searchRequestComponentsPage: SearchRequestComponentsPage;
    /*let searchRequestDeleteDialog: SearchRequestDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SearchRequests', async () => {
        await navBarPage.goToEntity('search-request');
        searchRequestComponentsPage = new SearchRequestComponentsPage();
        expect(await searchRequestComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.searchRequest.home.title');
    });

    it('should load create SearchRequest page', async () => {
        await searchRequestComponentsPage.clickOnCreateButton();
        searchRequestUpdatePage = new SearchRequestUpdatePage();
        expect(await searchRequestUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.searchRequest.home.createOrEditLabel');
        await searchRequestUpdatePage.cancel();
    });

    /* it('should create and save SearchRequests', async () => {
        const nbButtonsBeforeCreate = await searchRequestComponentsPage.countDeleteButtons();

        await searchRequestComponentsPage.clickOnCreateButton();
        await promise.all([
            searchRequestUpdatePage.setNameInput('name'),
            searchRequestUpdatePage.setDescriptionInput('description'),
            searchRequestUpdatePage.setMinSalaryInput('5'),
            searchRequestUpdatePage.setMaxSalaryInput('5'),
            searchRequestUpdatePage.setPositionInput('position'),
            searchRequestUpdatePage.companySelectLastOption(),
            searchRequestUpdatePage.ExpertiseLevelSelectLastOption(),
        ]);
        expect(await searchRequestUpdatePage.getNameInput()).to.eq('name');
        expect(await searchRequestUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await searchRequestUpdatePage.getMinSalaryInput()).to.eq('5');
        expect(await searchRequestUpdatePage.getMaxSalaryInput()).to.eq('5');
        expect(await searchRequestUpdatePage.getPositionInput()).to.eq('position');
        await searchRequestUpdatePage.save();
        expect(await searchRequestUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await searchRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last SearchRequest', async () => {
        const nbButtonsBeforeDelete = await searchRequestComponentsPage.countDeleteButtons();
        await searchRequestComponentsPage.clickOnLastDeleteButton();

        searchRequestDeleteDialog = new SearchRequestDeleteDialog();
        expect(await searchRequestDeleteDialog.getDialogTitle())
            .to.eq('talentpipeFrontendApp.searchRequest.delete.question');
        await searchRequestDeleteDialog.clickOnConfirmButton();

        expect(await searchRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
