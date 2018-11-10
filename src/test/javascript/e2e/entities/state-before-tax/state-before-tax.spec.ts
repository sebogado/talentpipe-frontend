/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import StateBeforeTaxComponentsPage from './state-before-tax.page-object';
import { StateBeforeTaxDeleteDialog } from './state-before-tax.page-object';
import StateBeforeTaxUpdatePage from './state-before-tax-update.page-object';

const expect = chai.expect;

describe('StateBeforeTax e2e test', () => {
  let navBarPage: NavBarPage;
  let stateBeforeTaxUpdatePage: StateBeforeTaxUpdatePage;
  let stateBeforeTaxComponentsPage: StateBeforeTaxComponentsPage;
  let stateBeforeTaxDeleteDialog: StateBeforeTaxDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load StateBeforeTaxes', async () => {
    navBarPage.getEntityPage('state-before-tax');
    stateBeforeTaxComponentsPage = new StateBeforeTaxComponentsPage();
    expect(await stateBeforeTaxComponentsPage.getTitle().getText()).to.match(/State Before Taxes/);
  });

  it('should load create StateBeforeTax page', async () => {
    stateBeforeTaxComponentsPage.clickOnCreateButton();
    stateBeforeTaxUpdatePage = new StateBeforeTaxUpdatePage();
    expect(await stateBeforeTaxUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /talentpipeApp.stateBeforeTax.home.createOrEditLabel/
    );
  });

  it('should create and save StateBeforeTaxes', async () => {
    const nbButtonsBeforeCreate = await stateBeforeTaxComponentsPage.countDeleteButtons();

    stateBeforeTaxUpdatePage.setNameInput('name');
    expect(await stateBeforeTaxUpdatePage.getNameInput()).to.match(/name/);
    stateBeforeTaxUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await stateBeforeTaxUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    stateBeforeTaxUpdatePage.setDescriptionInput('description');
    expect(await stateBeforeTaxUpdatePage.getDescriptionInput()).to.match(/description/);
    await stateBeforeTaxUpdatePage.save();
    expect(await stateBeforeTaxUpdatePage.getSaveButton().isPresent()).to.be.false;

    stateBeforeTaxComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await stateBeforeTaxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last StateBeforeTax', async () => {
    stateBeforeTaxComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await stateBeforeTaxComponentsPage.countDeleteButtons();
    await stateBeforeTaxComponentsPage.clickOnLastDeleteButton();

    stateBeforeTaxDeleteDialog = new StateBeforeTaxDeleteDialog();
    expect(await stateBeforeTaxDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentpipeApp.stateBeforeTax.delete.question/);
    await stateBeforeTaxDeleteDialog.clickOnConfirmButton();

    stateBeforeTaxComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await stateBeforeTaxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
