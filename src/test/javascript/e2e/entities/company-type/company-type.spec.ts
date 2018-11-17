/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CompanyTypeComponentsPage from './company-type.page-object';
import { CompanyTypeDeleteDialog } from './company-type.page-object';
import CompanyTypeUpdatePage from './company-type-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('CompanyType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let companyTypeUpdatePage: CompanyTypeUpdatePage;
  let companyTypeComponentsPage: CompanyTypeComponentsPage;
  let companyTypeDeleteDialog: CompanyTypeDeleteDialog;

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

  it('should load CompanyTypes', async () => {
    await navBarPage.getEntityPage('company-type');
    companyTypeComponentsPage = new CompanyTypeComponentsPage();
    expect(await companyTypeComponentsPage.getTitle().getText()).to.match(/Company Types/);
  });

  it('should load create CompanyType page', async () => {
    await companyTypeComponentsPage.clickOnCreateButton();
    companyTypeUpdatePage = new CompanyTypeUpdatePage();
    expect(await companyTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /talentPipeFrontendApp.companyType.home.createOrEditLabel/
    );
  });

  it('should create and save CompanyTypes', async () => {
    const nbButtonsBeforeCreate = await companyTypeComponentsPage.countDeleteButtons();

    await companyTypeUpdatePage.setNameInput('name');
    expect(await companyTypeUpdatePage.getNameInput()).to.match(/name/);
    await companyTypeUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await companyTypeUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    await companyTypeUpdatePage.setDescriptionInput('description');
    expect(await companyTypeUpdatePage.getDescriptionInput()).to.match(/description/);
    await companyTypeUpdatePage.setMinEmployeesQuantityInput('5');
    expect(await companyTypeUpdatePage.getMinEmployeesQuantityInput()).to.eq('5');
    await companyTypeUpdatePage.setMaxEmployeesQuantityInput('5');
    expect(await companyTypeUpdatePage.getMaxEmployeesQuantityInput()).to.eq('5');
    await waitUntilDisplayed(companyTypeUpdatePage.getSaveButton());
    await companyTypeUpdatePage.save();
    await waitUntilHidden(companyTypeUpdatePage.getSaveButton());
    expect(await companyTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

    await companyTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await companyTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last CompanyType', async () => {
    await companyTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await companyTypeComponentsPage.countDeleteButtons();
    await companyTypeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    companyTypeDeleteDialog = new CompanyTypeDeleteDialog();
    expect(await companyTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.companyType.delete.question/);
    await companyTypeDeleteDialog.clickOnConfirmButton();

    await companyTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await companyTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
