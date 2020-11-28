import { browser, by, element } from 'protractor';

/**
 *app.po.ts
 *
 * @export
 * @class AppPage
 */
export class AppPage {
  /**
   *Navigate to base url
   *
   * @return {*}  {Promise<unknown>}
   * @memberof AppPage
   */
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  /**
   *Get the homepage heading element reference
   *
   * @return {*}  {Promise<string>}
   * @memberof AppPage
   */
  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
