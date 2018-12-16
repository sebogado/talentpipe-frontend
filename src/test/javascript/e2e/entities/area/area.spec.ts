/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AreaComponentsPage, AreaDeleteDialog, AreaUpdatePage } from './area.page-object';

const expect = chai.expect;

describe('Area e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let areaUpdatePage: AreaUpdatePage;
    let areaComponentsPage: AreaComponentsPage;
    let areaDeleteDialog: AreaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Areas', async () => {
        await navBarPage.goToEntity('area');
        areaComponentsPage = new AreaComponentsPage();
        expect(await areaComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.area.home.title');
    });

    it('should load create Area page', async () => {
        await areaComponentsPage.clickOnCreateButton();
        areaUpdatePage = new AreaUpdatePage();
        expect(await areaUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.area.home.createOrEditLabel');
        await areaUpdatePage.cancel();
    });

    it('should create and save Areas', async () => {
        const nbButtonsBeforeCreate = await areaComponentsPage.countDeleteButtons();

        await areaComponentsPage.clickOnCreateButton();
        await promise.all([areaUpdatePage.setNameInput('name'), areaUpdatePage.setDescriptionInput('description')]);
        expect(await areaUpdatePage.getNameInput()).to.eq('name');
        expect(await areaUpdatePage.getDescriptionInput()).to.eq('description');
        await areaUpdatePage.save();
        expect(await areaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await areaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Area', async () => {
        const nbButtonsBeforeDelete = await areaComponentsPage.countDeleteButtons();
        await areaComponentsPage.clickOnLastDeleteButton();

        areaDeleteDialog = new AreaDeleteDialog();
        expect(await areaDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.area.delete.question');
        await areaDeleteDialog.clickOnConfirmButton();

        expect(await areaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
