import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for Students-Record', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be Students-Record', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('Students-Record');
    })
  });

  it('navbar-brand should be students-network@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('students-network@0.0.1');
  });

  
    it('Student component should be loadable',() => {
      page.navigateTo('/Student');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Student');
    });

    it('Student table should have 6 columns',() => {
      page.navigateTo('/Student');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  

});
