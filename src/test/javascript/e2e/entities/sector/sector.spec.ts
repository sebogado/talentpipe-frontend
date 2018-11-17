/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SectorComponentsPage from './sector.page-object';
import { SectorDeleteDialog } from './sector.page-object';
import SectorUpdatePage from './sector-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Sector e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sectorUpdatePage: SectorUpdatePage;
  let sectorComponentsPage: SectorComponentsPage;
  let sectorDeleteDialog: SectorDeleteDialog;

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

  it('should load Sectors', async () => {
    await navBarPage.getEntityPage('sector');
    sectorComponentsPage = new SectorComponentsPage();
    expect(await sectorComponentsPage.getTitle().getText()).to.match(/Sectors/);
  });

  it('should load create Sector page', async () => {
    await sectorComponentsPage.clickOnCreateButton();
    sectorUpdatePage = new SectorUpdatePage();
    expect(await sectorUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.sector.home.createOrEditLabel/);
  });

  it('should create and save Sectors', async () => {
    const nbButtonsBeforeCreate = await sectorComponentsPage.countDeleteButtons();

    await sectorUpdatePage.setNameInput('name');
    expect(await sectorUpdatePage.getNameInput()).to.match(/name/);
    await sectorUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await sectorUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    await sectorUpdatePage.setDescriptionInput('description');
    expect(await sectorUpdatePage.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(sectorUpdatePage.getSaveButton());
    await sectorUpdatePage.save();
    await waitUntilHidden(sectorUpdatePage.getSaveButton());
    expect(await sectorUpdatePage.getSaveButton().isPresent()).to.be.false;

    await sectorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await sectorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Sector', async () => {
    await sectorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await sectorComponentsPage.countDeleteButtons();
    await sectorComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    sectorDeleteDialog = new SectorDeleteDialog();
    expect(await sectorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.sector.delete.question/);
    await sectorDeleteDialog.clickOnConfirmButton();

    await sectorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await sectorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
