/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SectorComponentsPage from './sector.page-object';
import { SectorDeleteDialog } from './sector.page-object';
import SectorUpdatePage from './sector-update.page-object';

const expect = chai.expect;

describe('Sector e2e test', () => {
  let navBarPage: NavBarPage;
  let sectorUpdatePage: SectorUpdatePage;
  let sectorComponentsPage: SectorComponentsPage;
  let sectorDeleteDialog: SectorDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Sectors', async () => {
    navBarPage.getEntityPage('sector');
    sectorComponentsPage = new SectorComponentsPage();
    expect(await sectorComponentsPage.getTitle().getText()).to.match(/Sectors/);
  });

  it('should load create Sector page', async () => {
    sectorComponentsPage.clickOnCreateButton();
    sectorUpdatePage = new SectorUpdatePage();
    expect(await sectorUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentpipeApp.sector.home.createOrEditLabel/);
  });

  it('should create and save Sectors', async () => {
    const nbButtonsBeforeCreate = await sectorComponentsPage.countDeleteButtons();

    sectorUpdatePage.setNameInput('name');
    expect(await sectorUpdatePage.getNameInput()).to.match(/name/);
    sectorUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await sectorUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    sectorUpdatePage.setDescriptionInput('description');
    expect(await sectorUpdatePage.getDescriptionInput()).to.match(/description/);
    await sectorUpdatePage.save();
    expect(await sectorUpdatePage.getSaveButton().isPresent()).to.be.false;

    sectorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await sectorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Sector', async () => {
    sectorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await sectorComponentsPage.countDeleteButtons();
    await sectorComponentsPage.clickOnLastDeleteButton();

    sectorDeleteDialog = new SectorDeleteDialog();
    expect(await sectorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentpipeApp.sector.delete.question/);
    await sectorDeleteDialog.clickOnConfirmButton();

    sectorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await sectorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
