/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WorkTypeComponentsPage, WorkTypeDeleteDialog, WorkTypeUpdatePage } from './work-type.page-object';

const expect = chai.expect;

describe('WorkType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let workTypeUpdatePage: WorkTypeUpdatePage;
    let workTypeComponentsPage: WorkTypeComponentsPage;
    let workTypeDeleteDialog: WorkTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load WorkTypes', async () => {
        await navBarPage.goToEntity('work-type');
        workTypeComponentsPage = new WorkTypeComponentsPage();
        expect(await workTypeComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.workType.home.title');
    });

    it('should load create WorkType page', async () => {
        await workTypeComponentsPage.clickOnCreateButton();
        workTypeUpdatePage = new WorkTypeUpdatePage();
        expect(await workTypeUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.workType.home.createOrEditLabel');
        await workTypeUpdatePage.cancel();
    });

    it('should create and save WorkTypes', async () => {
        const nbButtonsBeforeCreate = await workTypeComponentsPage.countDeleteButtons();

        await workTypeComponentsPage.clickOnCreateButton();
        await promise.all([
            workTypeUpdatePage.setNameInput('name'),
            workTypeUpdatePage.setDescriptionInput('description'),
            workTypeUpdatePage.setMinQuantityHoursInput('5'),
            workTypeUpdatePage.setMaxQuantityHoursInput('5')
        ]);
        expect(await workTypeUpdatePage.getNameInput()).to.eq('name');
        expect(await workTypeUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await workTypeUpdatePage.getMinQuantityHoursInput()).to.eq('5');
        expect(await workTypeUpdatePage.getMaxQuantityHoursInput()).to.eq('5');
        await workTypeUpdatePage.save();
        expect(await workTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await workTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last WorkType', async () => {
        const nbButtonsBeforeDelete = await workTypeComponentsPage.countDeleteButtons();
        await workTypeComponentsPage.clickOnLastDeleteButton();

        workTypeDeleteDialog = new WorkTypeDeleteDialog();
        expect(await workTypeDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.workType.delete.question');
        await workTypeDeleteDialog.clickOnConfirmButton();

        expect(await workTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
