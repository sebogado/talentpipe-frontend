/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SoftSkillComponentsPage from './soft-skill.page-object';
import { SoftSkillDeleteDialog } from './soft-skill.page-object';
import SoftSkillUpdatePage from './soft-skill-update.page-object';

const expect = chai.expect;

describe('SoftSkill e2e test', () => {
  let navBarPage: NavBarPage;
  let softSkillUpdatePage: SoftSkillUpdatePage;
  let softSkillComponentsPage: SoftSkillComponentsPage;
  let softSkillDeleteDialog: SoftSkillDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load SoftSkills', async () => {
    navBarPage.getEntityPage('soft-skill');
    softSkillComponentsPage = new SoftSkillComponentsPage();
    expect(await softSkillComponentsPage.getTitle().getText()).to.match(/Soft Skills/);
  });

  it('should load create SoftSkill page', async () => {
    softSkillComponentsPage.clickOnCreateButton();
    softSkillUpdatePage = new SoftSkillUpdatePage();
    expect(await softSkillUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentpipeApp.softSkill.home.createOrEditLabel/);
  });

  it('should create and save SoftSkills', async () => {
    const nbButtonsBeforeCreate = await softSkillComponentsPage.countDeleteButtons();

    softSkillUpdatePage.setNameInput('name');
    expect(await softSkillUpdatePage.getNameInput()).to.match(/name/);
    softSkillUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await softSkillUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    softSkillUpdatePage.setDescriptionInput('description');
    expect(await softSkillUpdatePage.getDescriptionInput()).to.match(/description/);
    await softSkillUpdatePage.save();
    expect(await softSkillUpdatePage.getSaveButton().isPresent()).to.be.false;

    softSkillComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await softSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last SoftSkill', async () => {
    softSkillComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await softSkillComponentsPage.countDeleteButtons();
    await softSkillComponentsPage.clickOnLastDeleteButton();

    softSkillDeleteDialog = new SoftSkillDeleteDialog();
    expect(await softSkillDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentpipeApp.softSkill.delete.question/);
    await softSkillDeleteDialog.clickOnConfirmButton();

    softSkillComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await softSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
