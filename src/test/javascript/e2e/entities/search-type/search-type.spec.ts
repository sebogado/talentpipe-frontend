/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SearchTypeComponentsPage from './search-type.page-object';
import { SearchTypeDeleteDialog } from './search-type.page-object';
import SearchTypeUpdatePage from './search-type-update.page-object';

const expect = chai.expect;

describe('SearchType e2e test', () => {
  let navBarPage: NavBarPage;
  let searchTypeUpdatePage: SearchTypeUpdatePage;
  let searchTypeComponentsPage: SearchTypeComponentsPage;
  let searchTypeDeleteDialog: SearchTypeDeleteDialog;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load SearchTypes', async () => {
    navBarPage.getEntityPage('search-type');
    searchTypeComponentsPage = new SearchTypeComponentsPage();
    expect(await searchTypeComponentsPage.getTitle().getText()).to.match(/Search Types/);
  });

  it('should load create SearchType page', async () => {
    searchTypeComponentsPage.clickOnCreateButton();
    searchTypeUpdatePage = new SearchTypeUpdatePage();
    expect(await searchTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/talentpipeApp.searchType.home.createOrEditLabel/);
  });

  it('should create and save SearchTypes', async () => {
    const nbButtonsBeforeCreate = await searchTypeComponentsPage.countDeleteButtons();

    searchTypeUpdatePage.setNameInput('name');
    expect(await searchTypeUpdatePage.getNameInput()).to.match(/name/);
    searchTypeUpdatePage.setNormalizedNameInput('normalizedName');
    expect(await searchTypeUpdatePage.getNormalizedNameInput()).to.match(/normalizedName/);
    searchTypeUpdatePage.setDescriptionInput('description');
    expect(await searchTypeUpdatePage.getDescriptionInput()).to.match(/description/);
    await searchTypeUpdatePage.save();
    expect(await searchTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

    searchTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await searchTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last SearchType', async () => {
    searchTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await searchTypeComponentsPage.countDeleteButtons();
    await searchTypeComponentsPage.clickOnLastDeleteButton();

    searchTypeDeleteDialog = new SearchTypeDeleteDialog();
    expect(await searchTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/talentpipeApp.searchType.delete.question/);
    await searchTypeDeleteDialog.clickOnConfirmButton();

    searchTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await searchTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
