/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BenefitComponentsPage from './benefit.page-object';
import { BenefitDeleteDialog } from './benefit.page-object';
import BenefitUpdatePage from './benefit-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Benefit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let benefitUpdatePage: BenefitUpdatePage;
  let benefitComponentsPage: BenefitComponentsPage;
  let benefitDeleteDialog: BenefitDeleteDialog;

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

  it('should load Benefits', async () => {
    await navBarPage.getEntityPage('benefit');
    benefitComponentsPage = new BenefitComponentsPage();
    expect(await benefitComponentsPage.getTitle().getText()).to.match(/Benefits/);
  });

  it('should load create Benefit page', async () => {
    await benefitComponentsPage.clickOnCreateButton();
    benefitUpdatePage = new BenefitUpdatePage();
    expect(await benefitUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.benefit.home.createOrEditLabel/);
  });

  it('should create and save Benefits', async () => {
    const nbButtonsBeforeCreate = await benefitComponentsPage.countDeleteButtons();

    await benefitUpdatePage.setNameInput('name');
    expect(await benefitUpdatePage.getNameInput()).to.match(/name/);
    await benefitUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await benefitUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    await benefitUpdatePage.setDescriptionInput('description');
    expect(await benefitUpdatePage.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(benefitUpdatePage.getSaveButton());
    await benefitUpdatePage.save();
    await waitUntilHidden(benefitUpdatePage.getSaveButton());
    expect(await benefitUpdatePage.getSaveButton().isPresent()).to.be.false;

    await benefitComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await benefitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Benefit', async () => {
    await benefitComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await benefitComponentsPage.countDeleteButtons();
    await benefitComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    benefitDeleteDialog = new BenefitDeleteDialog();
    expect(await benefitDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.benefit.delete.question/);
    await benefitDeleteDialog.clickOnConfirmButton();

    await benefitComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await benefitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
