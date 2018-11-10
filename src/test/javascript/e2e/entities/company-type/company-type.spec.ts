/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import CompanyTypeComponentsPage from './company-type.page-object';
import { CompanyTypeDeleteDialog } from './company-type.page-object';
import CompanyTypeUpdatePage from './company-type-update.page-object';

const expect = chai.expect;

describe('CompanyType e2e test', () => {
  let navBarPage: NavBarPage;
  let companyTypeUpdatePage: CompanyTypeUpdatePage;
  let companyTypeComponentsPage: CompanyTypeComponentsPage;
  let companyTypeDeleteDialog: CompanyTypeDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load CompanyTypes', async () => {
    navBarPage.getEntityPage('company-type');
    companyTypeComponentsPage = new CompanyTypeComponentsPage();
    expect(await companyTypeComponentsPage.getTitle().getText()).to.match(/Company Types/);
  });

  it('should load create CompanyType page', async () => {
    companyTypeComponentsPage.clickOnCreateButton();
    companyTypeUpdatePage = new CompanyTypeUpdatePage();
    expect(await companyTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentpipeApp.companyType.home.createOrEditLabel/);
  });

  it('should create and save CompanyTypes', async () => {
    const nbButtonsBeforeCreate = await companyTypeComponentsPage.countDeleteButtons();

    companyTypeUpdatePage.setNameInput('name');
    expect(await companyTypeUpdatePage.getNameInput()).to.match(/name/);
    companyTypeUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await companyTypeUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    companyTypeUpdatePage.setDescriptionInput('description');
    expect(await companyTypeUpdatePage.getDescriptionInput()).to.match(/description/);
    companyTypeUpdatePage.setMinEmployeesQuantityInput('5');
    expect(await companyTypeUpdatePage.getMinEmployeesQuantityInput()).to.eq('5');
    companyTypeUpdatePage.setMaxEmployeesQuantityInput('5');
    expect(await companyTypeUpdatePage.getMaxEmployeesQuantityInput()).to.eq('5');
    await companyTypeUpdatePage.save();
    expect(await companyTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

    companyTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await companyTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last CompanyType', async () => {
    companyTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await companyTypeComponentsPage.countDeleteButtons();
    await companyTypeComponentsPage.clickOnLastDeleteButton();

    companyTypeDeleteDialog = new CompanyTypeDeleteDialog();
    expect(await companyTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentpipeApp.companyType.delete.question/);
    await companyTypeDeleteDialog.clickOnConfirmButton();

    companyTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await companyTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
