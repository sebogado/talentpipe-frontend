/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExpertiseLevelComponentsPage, ExpertiseLevelDeleteDialog, ExpertiseLevelUpdatePage } from './expertise-level.page-object';

const expect = chai.expect;

describe('ExpertiseLevel e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let expertiseLevelUpdatePage: ExpertiseLevelUpdatePage;
    let expertiseLevelComponentsPage: ExpertiseLevelComponentsPage;
    let expertiseLevelDeleteDialog: ExpertiseLevelDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ExpertiseLevels', async () => {
        await navBarPage.goToEntity('expertise-level');
        expertiseLevelComponentsPage = new ExpertiseLevelComponentsPage();
        expect(await expertiseLevelComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.expertiseLevel.home.title');
    });

    it('should load create ExpertiseLevel page', async () => {
        await expertiseLevelComponentsPage.clickOnCreateButton();
        expertiseLevelUpdatePage = new ExpertiseLevelUpdatePage();
        expect(await expertiseLevelUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.expertiseLevel.home.createOrEditLabel');
        await expertiseLevelUpdatePage.cancel();
    });

    it('should create and save ExpertiseLevels', async () => {
        const nbButtonsBeforeCreate = await expertiseLevelComponentsPage.countDeleteButtons();

        await expertiseLevelComponentsPage.clickOnCreateButton();
        await promise.all([expertiseLevelUpdatePage.setNameInput('name'), expertiseLevelUpdatePage.setDescriptionInput('description')]);
        expect(await expertiseLevelUpdatePage.getNameInput()).to.eq('name');
        expect(await expertiseLevelUpdatePage.getDescriptionInput()).to.eq('description');
        await expertiseLevelUpdatePage.save();
        expect(await expertiseLevelUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await expertiseLevelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ExpertiseLevel', async () => {
        const nbButtonsBeforeDelete = await expertiseLevelComponentsPage.countDeleteButtons();
        await expertiseLevelComponentsPage.clickOnLastDeleteButton();

        expertiseLevelDeleteDialog = new ExpertiseLevelDeleteDialog();
        expect(await expertiseLevelDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.expertiseLevel.delete.question');
        await expertiseLevelDeleteDialog.clickOnConfirmButton();

        expect(await expertiseLevelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
