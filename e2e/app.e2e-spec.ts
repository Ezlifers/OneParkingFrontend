import { OneParkingPage } from './app.po';

describe('one-parking App', () => {
  let page: OneParkingPage;

  beforeEach(() => {
    page = new OneParkingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
