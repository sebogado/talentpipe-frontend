/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SearchTypeComponentsPage, SearchTypeDeleteDialog, SearchTypeUpdatePage } from './search-type.page-object';

const expect = chai.expect;

describe('SearchType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let searchTypeUpdatePage: SearchTypeUpdatePage;
    let searchTypeComponentsPage: SearchTypeComponentsPage;
    let searchTypeDeleteDialog: SearchTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SearchTypes', async () => {
        await navBarPage.goToEntity('search-type');
        searchTypeComponentsPage = new SearchTypeComponentsPage();
        expect(await searchTypeComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.searchType.home.title');
    });

    it('should load create SearchType page', async () => {
        await searchTypeComponentsPage.clickOnCreateButton();
        searchTypeUpdatePage = new SearchTypeUpdatePage();
        expect(await searchTypeUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.searchType.home.createOrEditLabel');
        await searchTypeUpdatePage.cancel();
    });

    it('should create and save SearchTypes', async () => {
        const nbButtonsBeforeCreate = await searchTypeComponentsPage.countDeleteButtons();

        await searchTypeComponentsPage.clickOnCreateButton();
        await promise.all([searchTypeUpdatePage.setNameInput('name'), searchTypeUpdatePage.setDescriptionInput('description')]);
        expect(await searchTypeUpdatePage.getNameInput()).to.eq('name');
        expect(await searchTypeUpdatePage.getDescriptionInput()).to.eq('description');
        await searchTypeUpdatePage.save();
        expect(await searchTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await searchTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SearchType', async () => {
        const nbButtonsBeforeDelete = await searchTypeComponentsPage.countDeleteButtons();
        await searchTypeComponentsPage.clickOnLastDeleteButton();

        searchTypeDeleteDialog = new SearchTypeDeleteDialog();
        expect(await searchTypeDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.searchType.delete.question');
        await searchTypeDeleteDialog.clickOnConfirmButton();

        expect(await searchTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
