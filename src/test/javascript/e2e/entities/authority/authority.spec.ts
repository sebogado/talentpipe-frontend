/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AuthorityComponentsPage, AuthorityDeleteDialog, AuthorityUpdatePage } from './authority.page-object';

const expect = chai.expect;

describe('Authority e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let authorityUpdatePage: AuthorityUpdatePage;
    let authorityComponentsPage: AuthorityComponentsPage;
    let authorityDeleteDialog: AuthorityDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Authorities', async () => {
        await navBarPage.goToEntity('authority');
        authorityComponentsPage = new AuthorityComponentsPage();
        expect(await authorityComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.authority.home.title');
    });

    it('should load create Authority page', async () => {
        await authorityComponentsPage.clickOnCreateButton();
        authorityUpdatePage = new AuthorityUpdatePage();
        expect(await authorityUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.authority.home.createOrEditLabel');
        await authorityUpdatePage.cancel();
    });

    it('should create and save Authorities', async () => {
        const nbButtonsBeforeCreate = await authorityComponentsPage.countDeleteButtons();

        await authorityComponentsPage.clickOnCreateButton();
        await promise.all([authorityUpdatePage.setNameInput('name'), authorityUpdatePage.setDescriptionInput('description')]);
        expect(await authorityUpdatePage.getNameInput()).to.eq('name');
        expect(await authorityUpdatePage.getDescriptionInput()).to.eq('description');
        await authorityUpdatePage.save();
        expect(await authorityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await authorityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Authority', async () => {
        const nbButtonsBeforeDelete = await authorityComponentsPage.countDeleteButtons();
        await authorityComponentsPage.clickOnLastDeleteButton();

        authorityDeleteDialog = new AuthorityDeleteDialog();
        expect(await authorityDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.authority.delete.question');
        await authorityDeleteDialog.clickOnConfirmButton();

        expect(await authorityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
