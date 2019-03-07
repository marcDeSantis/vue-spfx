import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HelloWorldApplicationCustomizerStrings';

// Importing Vue.js
import Vue from 'vue';

const LOG_SOURCE: string = 'HelloWorldApplicationCustomizer';

import TopbarNavigation from './app/TopbarNavigation.vue';


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private _topPlaceholder: PlaceholderContent | undefined;


  private _renderPlaceHolders(): void {

    // Handling the top placeholder
    if (!this._topPlaceholder) {

      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this._topPlaceholder.domElement) {
        this._topPlaceholder.domElement.innerHTML = '<div id="TopbarNavigation"></div>';
      }

      var app = new Vue({
        el: '#TopbarNavigation',
        template: '<TopbarNavigation/>',
        components: { TopbarNavigation }
      });
    }
  }

  private _onDispose(): void {
    console.log(
      '[IntranetTopbarApplicationCustomizer._onDispose] Disposed intranet topbar.'
    );
  }
}
