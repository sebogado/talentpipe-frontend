/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TechnicalSkillComponentsPage, TechnicalSkillDeleteDialog, TechnicalSkillUpdatePage } from './technical-skill.page-object';

const expect = chai.expect;

describe('TechnicalSkill e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let technicalSkillUpdatePage: TechnicalSkillUpdatePage;
    let technicalSkillComponentsPage: TechnicalSkillComponentsPage;
    let technicalSkillDeleteDialog: TechnicalSkillDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TechnicalSkills', async () => {
        await navBarPage.goToEntity('technical-skill');
        technicalSkillComponentsPage = new TechnicalSkillComponentsPage();
        expect(await technicalSkillComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.technicalSkill.home.title');
    });

    it('should load create TechnicalSkill page', async () => {
        await technicalSkillComponentsPage.clickOnCreateButton();
        technicalSkillUpdatePage = new TechnicalSkillUpdatePage();
        expect(await technicalSkillUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.technicalSkill.home.createOrEditLabel');
        await technicalSkillUpdatePage.cancel();
    });

    it('should create and save TechnicalSkills', async () => {
        const nbButtonsBeforeCreate = await technicalSkillComponentsPage.countDeleteButtons();

        await technicalSkillComponentsPage.clickOnCreateButton();
        await promise.all([technicalSkillUpdatePage.setNameInput('name'), technicalSkillUpdatePage.setDescriptionInput('description')]);
        expect(await technicalSkillUpdatePage.getNameInput()).to.eq('name');
        expect(await technicalSkillUpdatePage.getDescriptionInput()).to.eq('description');
        await technicalSkillUpdatePage.save();
        expect(await technicalSkillUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await technicalSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TechnicalSkill', async () => {
        const nbButtonsBeforeDelete = await technicalSkillComponentsPage.countDeleteButtons();
        await technicalSkillComponentsPage.clickOnLastDeleteButton();

        technicalSkillDeleteDialog = new TechnicalSkillDeleteDialog();
        expect(await technicalSkillDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.technicalSkill.delete.question');
        await technicalSkillDeleteDialog.clickOnConfirmButton();

        expect(await technicalSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
