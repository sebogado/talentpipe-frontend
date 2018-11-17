/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SoftSkillComponentsPage from './soft-skill.page-object';
import { SoftSkillDeleteDialog } from './soft-skill.page-object';
import SoftSkillUpdatePage from './soft-skill-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

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
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();

    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load SoftSkills', async () => {
    await navBarPage.getEntityPage('soft-skill');
    softSkillComponentsPage = new SoftSkillComponentsPage();
    expect(await softSkillComponentsPage.getTitle().getText()).to.match(/Soft Skills/);
  });

  it('should load create SoftSkill page', async () => {
    await softSkillComponentsPage.clickOnCreateButton();
    softSkillUpdatePage = new SoftSkillUpdatePage();
    expect(await softSkillUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.softSkill.home.createOrEditLabel/);
  });

  it('should create and save SoftSkills', async () => {
    const nbButtonsBeforeCreate = await softSkillComponentsPage.countDeleteButtons();

    await softSkillUpdatePage.setNameInput('name');
    expect(await softSkillUpdatePage.getNameInput()).to.match(/name/);
    await softSkillUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await softSkillUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    await softSkillUpdatePage.setDescriptionInput('description');
    expect(await softSkillUpdatePage.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(softSkillUpdatePage.getSaveButton());
    await softSkillUpdatePage.save();
    await waitUntilHidden(softSkillUpdatePage.getSaveButton());
    expect(await softSkillUpdatePage.getSaveButton().isPresent()).to.be.false;

    await softSkillComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await softSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last SoftSkill', async () => {
    await softSkillComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await softSkillComponentsPage.countDeleteButtons();
    await softSkillComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    softSkillDeleteDialog = new SoftSkillDeleteDialog();
    expect(await softSkillDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.softSkill.delete.question/);
    await softSkillDeleteDialog.clickOnConfirmButton();

    await softSkillComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await softSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
