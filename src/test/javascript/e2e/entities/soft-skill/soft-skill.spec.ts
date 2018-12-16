/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SoftSkillComponentsPage, SoftSkillDeleteDialog, SoftSkillUpdatePage } from './soft-skill.page-object';

const expect = chai.expect;

describe('SoftSkill e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let softSkillUpdatePage: SoftSkillUpdatePage;
    let softSkillComponentsPage: SoftSkillComponentsPage;
    let softSkillDeleteDialog: SoftSkillDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SoftSkills', async () => {
        await navBarPage.goToEntity('soft-skill');
        softSkillComponentsPage = new SoftSkillComponentsPage();
        expect(await softSkillComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.softSkill.home.title');
    });

    it('should load create SoftSkill page', async () => {
        await softSkillComponentsPage.clickOnCreateButton();
        softSkillUpdatePage = new SoftSkillUpdatePage();
        expect(await softSkillUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.softSkill.home.createOrEditLabel');
        await softSkillUpdatePage.cancel();
    });

    it('should create and save SoftSkills', async () => {
        const nbButtonsBeforeCreate = await softSkillComponentsPage.countDeleteButtons();

        await softSkillComponentsPage.clickOnCreateButton();
        await promise.all([softSkillUpdatePage.setNameInput('name'), softSkillUpdatePage.setDescriptionInput('description')]);
        expect(await softSkillUpdatePage.getNameInput()).to.eq('name');
        expect(await softSkillUpdatePage.getDescriptionInput()).to.eq('description');
        await softSkillUpdatePage.save();
        expect(await softSkillUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await softSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SoftSkill', async () => {
        const nbButtonsBeforeDelete = await softSkillComponentsPage.countDeleteButtons();
        await softSkillComponentsPage.clickOnLastDeleteButton();

        softSkillDeleteDialog = new SoftSkillDeleteDialog();
        expect(await softSkillDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.softSkill.delete.question');
        await softSkillDeleteDialog.clickOnConfirmButton();

        expect(await softSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
