/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WorkTypeComponentsPage from './work-type.page-object';
import { WorkTypeDeleteDialog } from './work-type.page-object';
import WorkTypeUpdatePage from './work-type-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

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
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();

    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load WorkTypes', async () => {
    await navBarPage.getEntityPage('work-type');
    workTypeComponentsPage = new WorkTypeComponentsPage();
    expect(await workTypeComponentsPage.getTitle().getText()).to.match(/Work Types/);
  });

  it('should load create WorkType page', async () => {
    await workTypeComponentsPage.clickOnCreateButton();
    workTypeUpdatePage = new WorkTypeUpdatePage();
    expect(await workTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.workType.home.createOrEditLabel/);
  });

  it('should create and save WorkTypes', async () => {
    const nbButtonsBeforeCreate = await workTypeComponentsPage.countDeleteButtons();

    await workTypeUpdatePage.setNameInput('name');
    expect(await workTypeUpdatePage.getNameInput()).to.match(/name/);
    await workTypeUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await workTypeUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    await workTypeUpdatePage.setDescriptionInput('description');
    expect(await workTypeUpdatePage.getDescriptionInput()).to.match(/description/);
    await workTypeUpdatePage.setMinQuantityHoursInput('5');
    expect(await workTypeUpdatePage.getMinQuantityHoursInput()).to.eq('5');
    await workTypeUpdatePage.setMaxQuantityHoursInput('5');
    expect(await workTypeUpdatePage.getMaxQuantityHoursInput()).to.eq('5');
    await waitUntilDisplayed(workTypeUpdatePage.getSaveButton());
    await workTypeUpdatePage.save();
    await waitUntilHidden(workTypeUpdatePage.getSaveButton());
    expect(await workTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

    await workTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await workTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last WorkType', async () => {
    await workTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await workTypeComponentsPage.countDeleteButtons();
    await workTypeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    workTypeDeleteDialog = new WorkTypeDeleteDialog();
    expect(await workTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.workType.delete.question/);
    await workTypeDeleteDialog.clickOnConfirmButton();

    await workTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await workTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
