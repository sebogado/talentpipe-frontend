/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import CountryComponentsPage from './country.page-object';
import { CountryDeleteDialog } from './country.page-object';
import CountryUpdatePage from './country-update.page-object';

const expect = chai.expect;

describe('Country e2e test', () => {
  let navBarPage: NavBarPage;
  let countryUpdatePage: CountryUpdatePage;
  let countryComponentsPage: CountryComponentsPage;
  let countryDeleteDialog: CountryDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Countries', async () => {
    navBarPage.getEntityPage('country');
    countryComponentsPage = new CountryComponentsPage();
    expect(await countryComponentsPage.getTitle().getText()).to.match(/Countries/);
  });

  it('should load create Country page', async () => {
    countryComponentsPage.clickOnCreateButton();
    countryUpdatePage = new CountryUpdatePage();
    expect(await countryUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentpipeApp.country.home.createOrEditLabel/);
  });

  it('should create and save Countries', async () => {
    const nbButtonsBeforeCreate = await countryComponentsPage.countDeleteButtons();

    countryUpdatePage.setNameInput('name');
    expect(await countryUpdatePage.getNameInput()).to.match(/name/);
    countryUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await countryUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    countryUpdatePage.setCodeInput('code');
    expect(await countryUpdatePage.getCodeInput()).to.match(/code/);
    countryUpdatePage.setPhoneCodeInput('phoneCode');
    expect(await countryUpdatePage.getPhoneCodeInput()).to.match(/phoneCode/);
    countryUpdatePage.setCurrencyInput('currency');
    expect(await countryUpdatePage.getCurrencyInput()).to.match(/currency/);
    await countryUpdatePage.save();
    expect(await countryUpdatePage.getSaveButton().isPresent()).to.be.false;

    countryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await countryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Country', async () => {
    countryComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await countryComponentsPage.countDeleteButtons();
    await countryComponentsPage.clickOnLastDeleteButton();

    countryDeleteDialog = new CountryDeleteDialog();
    expect(await countryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentpipeApp.country.delete.question/);
    await countryDeleteDialog.clickOnConfirmButton();

    countryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await countryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
