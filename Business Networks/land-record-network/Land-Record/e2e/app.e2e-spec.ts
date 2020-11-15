import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for Land-Record', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be Land-Record', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('Land-Record');
    })
  });

  it('navbar-brand should be land-record-network@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('land-record-network@0.0.1');
  });

  
    it('Land component should be loadable',() => {
      page.navigateTo('/Land');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Land');
    });

    it('Land table should have 4 columns',() => {
      page.navigateTo('/Land');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  

});
