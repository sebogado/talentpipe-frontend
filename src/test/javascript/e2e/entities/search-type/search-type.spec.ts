/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SearchTypeComponentsPage from './search-type.page-object';
import { SearchTypeDeleteDialog } from './search-type.page-object';
import SearchTypeUpdatePage from './search-type-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('SearchType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let searchTypeUpdatePage: SearchTypeUpdatePage;
  let searchTypeComponentsPage: SearchTypeComponentsPage;
  let searchTypeDeleteDialog: SearchTypeDeleteDialog;

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

  it('should load SearchTypes', async () => {
    await navBarPage.getEntityPage('search-type');
    searchTypeComponentsPage = new SearchTypeComponentsPage();
    expect(await searchTypeComponentsPage.getTitle().getText()).to.match(/Search Types/);
  });

  it('should load create SearchType page', async () => {
    await searchTypeComponentsPage.clickOnCreateButton();
    searchTypeUpdatePage = new SearchTypeUpdatePage();
    expect(await searchTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /talentPipeFrontendApp.searchType.home.createOrEditLabel/
    );
  });

  it('should create and save SearchTypes', async () => {
    const nbButtonsBeforeCreate = await searchTypeComponentsPage.countDeleteButtons();

    await searchTypeUpdatePage.setNameInput('name');
    expect(await searchTypeUpdatePage.getNameInput()).to.match(/name/);
    await searchTypeUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await searchTypeUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    await searchTypeUpdatePage.setDescriptionInput('description');
    expect(await searchTypeUpdatePage.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(searchTypeUpdatePage.getSaveButton());
    await searchTypeUpdatePage.save();
    await waitUntilHidden(searchTypeUpdatePage.getSaveButton());
    expect(await searchTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

    await searchTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await searchTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last SearchType', async () => {
    await searchTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await searchTypeComponentsPage.countDeleteButtons();
    await searchTypeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    searchTypeDeleteDialog = new SearchTypeDeleteDialog();
    expect(await searchTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentPipeFrontendApp.searchType.delete.question/);
    await searchTypeDeleteDialog.clickOnConfirmButton();

    await searchTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await searchTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
