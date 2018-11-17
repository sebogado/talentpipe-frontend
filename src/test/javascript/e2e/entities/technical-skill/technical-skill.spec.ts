/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TechnicalSkillComponentsPage from './technical-skill.page-object';
import { TechnicalSkillDeleteDialog } from './technical-skill.page-object';
import TechnicalSkillUpdatePage from './technical-skill-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

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
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();

    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load TechnicalSkills', async () => {
    await navBarPage.getEntityPage('technical-skill');
    technicalSkillComponentsPage = new TechnicalSkillComponentsPage();
    expect(await technicalSkillComponentsPage.getTitle().getText()).to.match(/Technical Skills/);
  });

  it('should load create TechnicalSkill page', async () => {
    await technicalSkillComponentsPage.clickOnCreateButton();
    technicalSkillUpdatePage = new TechnicalSkillUpdatePage();
    expect(await technicalSkillUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /talentPipeFrontendApp.technicalSkill.home.createOrEditLabel/
    );
  });

  it('should create and save TechnicalSkills', async () => {
    const nbButtonsBeforeCreate = await technicalSkillComponentsPage.countDeleteButtons();

    await technicalSkillUpdatePage.setNameInput('name');
    expect(await technicalSkillUpdatePage.getNameInput()).to.match(/name/);
    await technicalSkillUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await technicalSkillUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    await technicalSkillUpdatePage.setDescriptionInput('description');
    expect(await technicalSkillUpdatePage.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(technicalSkillUpdatePage.getSaveButton());
    await technicalSkillUpdatePage.save();
    await waitUntilHidden(technicalSkillUpdatePage.getSaveButton());
    expect(await technicalSkillUpdatePage.getSaveButton().isPresent()).to.be.false;

    await technicalSkillComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await technicalSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last TechnicalSkill', async () => {
    await technicalSkillComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await technicalSkillComponentsPage.countDeleteButtons();
    await technicalSkillComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    technicalSkillDeleteDialog = new TechnicalSkillDeleteDialog();
    expect(await technicalSkillDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /talentPipeFrontendApp.technicalSkill.delete.question/
    );
    await technicalSkillDeleteDialog.clickOnConfirmButton();

    await technicalSkillComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await technicalSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
