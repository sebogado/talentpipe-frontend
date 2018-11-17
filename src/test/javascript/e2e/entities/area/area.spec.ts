/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AreaComponentsPage from './area.page-object';
import { AreaDeleteDialog } from './area.page-object';
import AreaUpdatePage from './area-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Area e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let areaUpdatePage: AreaUpdatePage;
  let areaComponentsPage: AreaComponentsPage;
  let areaDeleteDialog: AreaDeleteDialog;

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

  it('should load Areas', async () => {
    await navBarPage.getEntityPage('area');
    areaComponentsPage = new AreaComponentsPage();
    expect(await areaComponentsPage.getTitle().getText()).to.match(/Areas/);
  });

  it('should load create Area page', async () => {
    await areaComponentsPage.clickOnCreateButton();
    areaUpdatePage = new AreaUpdatePage();
    expect(await areaUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.area.home.createOrEditLabel/);
  });

  it('should create and save Areas', async () => {
    const nbButtonsBeforeCreate = await areaComponentsPage.countDeleteButtons();

    await areaUpdatePage.setNameInput('name');
    expect(await areaUpdatePage.getNameInput()).to.match(/name/);
    await areaUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await areaUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    await areaUpdatePage.setDescriptionInput('description');
    expect(await areaUpdatePage.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(areaUpdatePage.getSaveButton());
    await areaUpdatePage.save();
    await waitUntilHidden(areaUpdatePage.getSaveButton());
    expect(await areaUpdatePage.getSaveButton().isPresent()).to.be.false;

    await areaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await areaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Area', async () => {
    await areaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await areaComponentsPage.countDeleteButtons();
    await areaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    areaDeleteDialog = new AreaDeleteDialog();
    expect(await areaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.area.delete.question/);
    await areaDeleteDialog.clickOnConfirmButton();

    await areaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await areaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
