/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import AreaComponentsPage from './area.page-object';
import { AreaDeleteDialog } from './area.page-object';
import AreaUpdatePage from './area-update.page-object';

const expect = chai.expect;

describe('Area e2e test', () => {
  let navBarPage: NavBarPage;
  let areaUpdatePage: AreaUpdatePage;
  let areaComponentsPage: AreaComponentsPage;
  let areaDeleteDialog: AreaDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Areas', async () => {
    navBarPage.getEntityPage('area');
    areaComponentsPage = new AreaComponentsPage();
    expect(await areaComponentsPage.getTitle().getText()).to.match(/Areas/);
  });

  it('should load create Area page', async () => {
    areaComponentsPage.clickOnCreateButton();
    areaUpdatePage = new AreaUpdatePage();
    expect(await areaUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentpipeApp.area.home.createOrEditLabel/);
  });

  it('should create and save Areas', async () => {
    const nbButtonsBeforeCreate = await areaComponentsPage.countDeleteButtons();

    areaUpdatePage.setNameInput('name');
    expect(await areaUpdatePage.getNameInput()).to.match(/name/);
    areaUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await areaUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    areaUpdatePage.setDescriptionInput('description');
    expect(await areaUpdatePage.getDescriptionInput()).to.match(/description/);
    await areaUpdatePage.save();
    expect(await areaUpdatePage.getSaveButton().isPresent()).to.be.false;

    areaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await areaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Area', async () => {
    areaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await areaComponentsPage.countDeleteButtons();
    await areaComponentsPage.clickOnLastDeleteButton();

    areaDeleteDialog = new AreaDeleteDialog();
    expect(await areaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentpipeApp.area.delete.question/);
    await areaDeleteDialog.clickOnConfirmButton();

    areaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await areaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
