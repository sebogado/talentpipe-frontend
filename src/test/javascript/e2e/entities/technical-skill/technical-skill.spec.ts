/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import TechnicalSkillComponentsPage from './technical-skill.page-object';
import { TechnicalSkillDeleteDialog } from './technical-skill.page-object';
import TechnicalSkillUpdatePage from './technical-skill-update.page-object';

const expect = chai.expect;

describe('TechnicalSkill e2e test', () => {
  let navBarPage: NavBarPage;
  let technicalSkillUpdatePage: TechnicalSkillUpdatePage;
  let technicalSkillComponentsPage: TechnicalSkillComponentsPage;
  let technicalSkillDeleteDialog: TechnicalSkillDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load TechnicalSkills', async () => {
    navBarPage.getEntityPage('technical-skill');
    technicalSkillComponentsPage = new TechnicalSkillComponentsPage();
    expect(await technicalSkillComponentsPage.getTitle().getText()).to.match(/Technical Skills/);
  });

  it('should load create TechnicalSkill page', async () => {
    technicalSkillComponentsPage.clickOnCreateButton();
    technicalSkillUpdatePage = new TechnicalSkillUpdatePage();
    expect(await technicalSkillUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /talentpipeApp.technicalSkill.home.createOrEditLabel/
    );
  });

  it('should create and save TechnicalSkills', async () => {
    const nbButtonsBeforeCreate = await technicalSkillComponentsPage.countDeleteButtons();

    technicalSkillUpdatePage.setNameInput('name');
    expect(await technicalSkillUpdatePage.getNameInput()).to.match(/name/);
    technicalSkillUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await technicalSkillUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    technicalSkillUpdatePage.setDescriptionInput('description');
    expect(await technicalSkillUpdatePage.getDescriptionInput()).to.match(/description/);
    await technicalSkillUpdatePage.save();
    expect(await technicalSkillUpdatePage.getSaveButton().isPresent()).to.be.false;

    technicalSkillComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await technicalSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last TechnicalSkill', async () => {
    technicalSkillComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await technicalSkillComponentsPage.countDeleteButtons();
    await technicalSkillComponentsPage.clickOnLastDeleteButton();

    technicalSkillDeleteDialog = new TechnicalSkillDeleteDialog();
    expect(await technicalSkillDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentpipeApp.technicalSkill.delete.question/);
    await technicalSkillDeleteDialog.clickOnConfirmButton();

    technicalSkillComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await technicalSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
