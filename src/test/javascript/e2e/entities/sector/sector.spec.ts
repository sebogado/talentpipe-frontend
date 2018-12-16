/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SectorComponentsPage, SectorDeleteDialog, SectorUpdatePage } from './sector.page-object';

const expect = chai.expect;

describe('Sector e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let sectorUpdatePage: SectorUpdatePage;
    let sectorComponentsPage: SectorComponentsPage;
    let sectorDeleteDialog: SectorDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Sectors', async () => {
        await navBarPage.goToEntity('sector');
        sectorComponentsPage = new SectorComponentsPage();
        expect(await sectorComponentsPage.getTitle()).to.eq('talentpipeFrontendApp.sector.home.title');
    });

    it('should load create Sector page', async () => {
        await sectorComponentsPage.clickOnCreateButton();
        sectorUpdatePage = new SectorUpdatePage();
        expect(await sectorUpdatePage.getPageTitle()).to.eq('talentpipeFrontendApp.sector.home.createOrEditLabel');
        await sectorUpdatePage.cancel();
    });

    it('should create and save Sectors', async () => {
        const nbButtonsBeforeCreate = await sectorComponentsPage.countDeleteButtons();

        await sectorComponentsPage.clickOnCreateButton();
        await promise.all([sectorUpdatePage.setNameInput('name'), sectorUpdatePage.setDescriptionInput('description')]);
        expect(await sectorUpdatePage.getNameInput()).to.eq('name');
        expect(await sectorUpdatePage.getDescriptionInput()).to.eq('description');
        await sectorUpdatePage.save();
        expect(await sectorUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await sectorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Sector', async () => {
        const nbButtonsBeforeDelete = await sectorComponentsPage.countDeleteButtons();
        await sectorComponentsPage.clickOnLastDeleteButton();

        sectorDeleteDialog = new SectorDeleteDialog();
        expect(await sectorDeleteDialog.getDialogTitle()).to.eq('talentpipeFrontendApp.sector.delete.question');
        await sectorDeleteDialog.clickOnConfirmButton();

        expect(await sectorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
