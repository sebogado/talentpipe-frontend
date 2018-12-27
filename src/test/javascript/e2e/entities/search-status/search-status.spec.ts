/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SearchStatusComponentsPage, SearchStatusDeleteDialog, SearchStatusUpdatePage } from './search-status.page-object';

const expect = chai.expect;

describe('SearchStatus e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let searchStatusUpdatePage: SearchStatusUpdatePage;
    let searchStatusComponentsPage: SearchStatusComponentsPage;
    let searchStatusDeleteDialog: SearchStatusDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SearchStatuses', async () => {
        await navBarPage.goToEntity('search-status');
        searchStatusComponentsPage = new SearchStatusComponentsPage();
        expect(await searchStatusComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.searchStatus.home.title');
    });

    it('should load create SearchStatus page', async () => {
        await searchStatusComponentsPage.clickOnCreateButton();
        searchStatusUpdatePage = new SearchStatusUpdatePage();
        expect(await searchStatusUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.searchStatus.home.createOrEditLabel');
        await searchStatusUpdatePage.cancel();
    });

    it('should create and save SearchStatuses', async () => {
        const nbButtonsBeforeCreate = await searchStatusComponentsPage.countDeleteButtons();

        await searchStatusComponentsPage.clickOnCreateButton();
        await promise.all([searchStatusUpdatePage.setNameInput('name'), searchStatusUpdatePage.setDescriptionInput('description')]);
        expect(await searchStatusUpdatePage.getNameInput()).to.eq('name');
        expect(await searchStatusUpdatePage.getDescriptionInput()).to.eq('description');
        await searchStatusUpdatePage.save();
        expect(await searchStatusUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await searchStatusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SearchStatus', async () => {
        const nbButtonsBeforeDelete = await searchStatusComponentsPage.countDeleteButtons();
        await searchStatusComponentsPage.clickOnLastDeleteButton();

        searchStatusDeleteDialog = new SearchStatusDeleteDialog();
        expect(await searchStatusDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.searchStatus.delete.question');
        await searchStatusDeleteDialog.clickOnConfirmButton();

        expect(await searchStatusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
