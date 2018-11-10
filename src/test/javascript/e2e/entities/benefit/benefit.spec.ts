/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import BenefitComponentsPage from './benefit.page-object';
import { BenefitDeleteDialog } from './benefit.page-object';
import BenefitUpdatePage from './benefit-update.page-object';

const expect = chai.expect;

describe('Benefit e2e test', () => {
  let navBarPage: NavBarPage;
  let benefitUpdatePage: BenefitUpdatePage;
  let benefitComponentsPage: BenefitComponentsPage;
  let benefitDeleteDialog: BenefitDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Benefits', async () => {
    navBarPage.getEntityPage('benefit');
    benefitComponentsPage = new BenefitComponentsPage();
    expect(await benefitComponentsPage.getTitle().getText()).to.match(/Benefits/);
  });

  it('should load create Benefit page', async () => {
    benefitComponentsPage.clickOnCreateButton();
    benefitUpdatePage = new BenefitUpdatePage();
    expect(await benefitUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentpipeApp.benefit.home.createOrEditLabel/);
  });

  it('should create and save Benefits', async () => {
    const nbButtonsBeforeCreate = await benefitComponentsPage.countDeleteButtons();

    benefitUpdatePage.setNameInput('name');
    expect(await benefitUpdatePage.getNameInput()).to.match(/name/);
    benefitUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await benefitUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    benefitUpdatePage.setDescriptionInput('description');
    expect(await benefitUpdatePage.getDescriptionInput()).to.match(/description/);
    await benefitUpdatePage.save();
    expect(await benefitUpdatePage.getSaveButton().isPresent()).to.be.false;

    benefitComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await benefitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Benefit', async () => {
    benefitComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await benefitComponentsPage.countDeleteButtons();
    await benefitComponentsPage.clickOnLastDeleteButton();

    benefitDeleteDialog = new BenefitDeleteDialog();
    expect(await benefitDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentpipeApp.benefit.delete.question/);
    await benefitDeleteDialog.clickOnConfirmButton();

    benefitComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await benefitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
