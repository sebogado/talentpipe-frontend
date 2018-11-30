/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RecruiterComponentsPage from './recruiter.page-object';
import { RecruiterDeleteDialog } from './recruiter.page-object';
import RecruiterUpdatePage from './recruiter-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Recruiter e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recruiterUpdatePage: RecruiterUpdatePage;
  let recruiterComponentsPage: RecruiterComponentsPage;
  /*let recruiterDeleteDialog: RecruiterDeleteDialog;*/

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

  it('should load Recruiters', async () => {
    await navBarPage.getEntityPage('recruiter');
    recruiterComponentsPage = new RecruiterComponentsPage();
    expect(await recruiterComponentsPage.getTitle().getText()).to.match(/Recruiters/);
  });

  it('should load create Recruiter page', async () => {
    await recruiterComponentsPage.clickOnCreateButton();
    recruiterUpdatePage = new RecruiterUpdatePage();
    expect(await recruiterUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.recruiter.home.createOrEditLabel/);
  });

  /* it('should create and save Recruiters', async () => {
        const nbButtonsBeforeCreate = await recruiterComponentsPage.countDeleteButtons();

        await recruiterUpdatePage.setNameInput('name');
        expect(await recruiterUpdatePage.getNameInput()).to.match(/name/);
        await recruiterUpdatePage.setLastNameInput('lastName');
        expect(await recruiterUpdatePage.getLastNameInput()).to.match(/lastName/);
        await recruiterUpdatePage.setEmailInput('email');
        expect(await recruiterUpdatePage.getEmailInput()).to.match(/email/);
        await recruiterUpdatePage.setTaxIdInput('taxId');
        expect(await recruiterUpdatePage.getTaxIdInput()).to.match(/taxId/);
        await recruiterUpdatePage.setPhoneInput('phone');
        expect(await recruiterUpdatePage.getPhoneInput()).to.match(/phone/);
        await recruiterUpdatePage.setStreetInput('street');
        expect(await recruiterUpdatePage.getStreetInput()).to.match(/street/);
        await recruiterUpdatePage.setNumberInput('5');
        expect(await recruiterUpdatePage.getNumberInput()).to.eq('5');
        await recruiterUpdatePage.setFloorInput('5');
        expect(await recruiterUpdatePage.getFloorInput()).to.eq('5');
        await recruiterUpdatePage.setApartmentInput('apartment');
        expect(await recruiterUpdatePage.getApartmentInput()).to.match(/apartment/);
        await recruiterUpdatePage.citySelectLastOption();
        await recruiterUpdatePage.sectorSelectLastOption();
        await waitUntilDisplayed(recruiterUpdatePage.getSaveButton());
        await recruiterUpdatePage.save();
        await waitUntilHidden(recruiterUpdatePage.getSaveButton());
        expect(await recruiterUpdatePage.getSaveButton().isPresent()).to.be.false;

        await recruiterComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await recruiterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

  /* it('should delete last Recruiter', async () => {
        await recruiterComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await recruiterComponentsPage.countDeleteButtons();
        await recruiterComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        recruiterDeleteDialog = new RecruiterDeleteDialog();
        expect(await recruiterDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.recruiter.delete.question/);
        await recruiterDeleteDialog.clickOnConfirmButton();

        await recruiterComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await recruiterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
