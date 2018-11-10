/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import WorkTypeComponentsPage from './work-type.page-object';
import { WorkTypeDeleteDialog } from './work-type.page-object';
import WorkTypeUpdatePage from './work-type-update.page-object';

const expect = chai.expect;

describe('WorkType e2e test', () => {
  let navBarPage: NavBarPage;
  let workTypeUpdatePage: WorkTypeUpdatePage;
  let workTypeComponentsPage: WorkTypeComponentsPage;
  let workTypeDeleteDialog: WorkTypeDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load WorkTypes', async () => {
    navBarPage.getEntityPage('work-type');
    workTypeComponentsPage = new WorkTypeComponentsPage();
    expect(await workTypeComponentsPage.getTitle().getText()).to.match(/Work Types/);
  });

  it('should load create WorkType page', async () => {
    workTypeComponentsPage.clickOnCreateButton();
    workTypeUpdatePage = new WorkTypeUpdatePage();
    expect(await workTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentpipeApp.workType.home.createOrEditLabel/);
  });

  it('should create and save WorkTypes', async () => {
    const nbButtonsBeforeCreate = await workTypeComponentsPage.countDeleteButtons();

    workTypeUpdatePage.setNameInput('name');
    expect(await workTypeUpdatePage.getNameInput()).to.match(/name/);
    workTypeUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await workTypeUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    workTypeUpdatePage.setDescriptionInput('description');
    expect(await workTypeUpdatePage.getDescriptionInput()).to.match(/description/);
    workTypeUpdatePage.setMinQuantityHoursInput('5');
    expect(await workTypeUpdatePage.getMinQuantityHoursInput()).to.eq('5');
    workTypeUpdatePage.setMaxQuantityHoursInput('5');
    expect(await workTypeUpdatePage.getMaxQuantityHoursInput()).to.eq('5');
    await workTypeUpdatePage.save();
    expect(await workTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

    workTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await workTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last WorkType', async () => {
    workTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await workTypeComponentsPage.countDeleteButtons();
    await workTypeComponentsPage.clickOnLastDeleteButton();

    workTypeDeleteDialog = new WorkTypeDeleteDialog();
    expect(await workTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentpipeApp.workType.delete.question/);
    await workTypeDeleteDialog.clickOnConfirmButton();

    workTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await workTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
