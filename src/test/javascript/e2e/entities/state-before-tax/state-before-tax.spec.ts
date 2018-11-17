/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StateBeforeTaxComponentsPage from './state-before-tax.page-object';
import { StateBeforeTaxDeleteDialog } from './state-before-tax.page-object';
import StateBeforeTaxUpdatePage from './state-before-tax-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('StateBeforeTax e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let stateBeforeTaxUpdatePage: StateBeforeTaxUpdatePage;
  let stateBeforeTaxComponentsPage: StateBeforeTaxComponentsPage;
  let stateBeforeTaxDeleteDialog: StateBeforeTaxDeleteDialog;

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

  it('should load StateBeforeTaxes', async () => {
    await navBarPage.getEntityPage('state-before-tax');
    stateBeforeTaxComponentsPage = new StateBeforeTaxComponentsPage();
    expect(await stateBeforeTaxComponentsPage.getTitle().getText()).to.match(/State Before Taxes/);
  });

  it('should load create StateBeforeTax page', async () => {
    await stateBeforeTaxComponentsPage.clickOnCreateButton();
    stateBeforeTaxUpdatePage = new StateBeforeTaxUpdatePage();
    expect(await stateBeforeTaxUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /talentPipeFrontendApp.stateBeforeTax.home.createOrEditLabel/
    );
  });

  it('should create and save StateBeforeTaxes', async () => {
    const nbButtonsBeforeCreate = await stateBeforeTaxComponentsPage.countDeleteButtons();

    await stateBeforeTaxUpdatePage.setNameInput('name');
    expect(await stateBeforeTaxUpdatePage.getNameInput()).to.match(/name/);
    await stateBeforeTaxUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await stateBeforeTaxUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    await stateBeforeTaxUpdatePage.setDescriptionInput('description');
    expect(await stateBeforeTaxUpdatePage.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(stateBeforeTaxUpdatePage.getSaveButton());
    await stateBeforeTaxUpdatePage.save();
    await waitUntilHidden(stateBeforeTaxUpdatePage.getSaveButton());
    expect(await stateBeforeTaxUpdatePage.getSaveButton().isPresent()).to.be.false;

    await stateBeforeTaxComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await stateBeforeTaxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last StateBeforeTax', async () => {
    await stateBeforeTaxComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await stateBeforeTaxComponentsPage.countDeleteButtons();
    await stateBeforeTaxComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    stateBeforeTaxDeleteDialog = new StateBeforeTaxDeleteDialog();
    expect(await stateBeforeTaxDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /talentPipeFrontendApp.stateBeforeTax.delete.question/
    );
    await stateBeforeTaxDeleteDialog.clickOnConfirmButton();

    await stateBeforeTaxComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await stateBeforeTaxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
