/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {

  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #ff6200!important;
          --app-secondary-color: #1f1f1f;
          --app-paper-dialog-border: 1px solid red;
          --app-header-layout-bg: #f1f1f1!important;
          --app-bottom-border-color: rgba(0,0,0,0.8)!important;

         
        }
        
        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }
        app-header-layout{
          background-color:var(--app-header-layout-bg);
        }
        app-header {
          color: blue;
          background-color: var(--app-primary-color);
          border-bottom:4px solid  var(--app-bottom-border-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }
        app-toolbar{
          background-color: var(--app-primary-color);
        }
      
        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          
          color:white;
          background-color: #ff6200!important;
        }
        .drawer-list a:hover {
          
        border:10px soild green;
        }
        .drawer-list a.iron-selected :hover {
         border-bottom:2px solid red;
        }
        #contentContainer{
          background-color: red;
        }
       
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}" style="background-color:#f1f1f1!important">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]" style="background-color:red">
          <app-toolbar><img src="/images/ing-logo-vector.png"  height="200%"></app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                   
                    <a name="login" href="[[rootPath]]login"></a>
                    <a name="payee" href="[[rootPath]]payee"></a>
                    <a name="dashboard" href="[[rootPath]]dashboard"></a>
        </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">
                    <app-header slot="header" condenses="" reveals="" effects="waterfall">
                      <app-toolbar>
                        <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
                        <div main-title="" style="color:white">Banking Application</div>
                        <paper-dropdown-menu label="English" style="color:#fff">
                        <paper-listbox slot="dropdown-content" class="dropdown-content">
                        <paper-item   name="assosor"><span>French</span></paper-item>
                        <paper-item   name="assosor"><span>Spanish</span></paper-item>
                        
                             
                        </paper-listbox>
                  </paper-dropdown-menu>  

                        <div main-title="" style="color:white"><span></span></div>
                        
                  <template is="dom-if" if="{{isAdmin}}">
                   <!--  <paper-tabs selected="0">
                        <iron-selector  selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                                 
                                  <a style="display:inline" name="demo2" href="[[rootPath]]demo2">
                                  <paper-tab id="create" data-item$="create" on-click="_switchBetweenLoginAndCreate">Demo 2 </paper-tab>
                                  </a>
                                  <a  style="display:inline" name="demo6" href="[[rootPath]]demo6">Demo6</a>
                        </iron-selector>
                    </paper-tabs>-->
                </template>
                      <paper-tab style="margin-left:0px"></paper-tab>
                      </app-toolbar>
                    </app-header>
                   
                    
                    <iron-pages selected="[[page]]" attr-for-selected="name" role="main"  >
                            <dash-board name="dashboard"></dash-board>
                            <login-element  name="login"></login-element>
                            <payee-element name="payee"></payee-element>
                            <page-not-found name="pagenotfound"></page-not-found>
                    </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }
  constructor() {
    sessionStorage.setItem("isAdmin", false);
    super();

  }
  connectedCallback() {
    super.connectedCallback();
    sessionStorage.isSubmitOrder = false;
    this.isAdmin= sessionStorage.getItem("isAdmin");

  }
  _handleError() {
    alert('Error is Web Service');
  }
  _switchBetweenLoginAndCreate(event) {
    console.log('_switchBetweenLoginAndCreate', event.target.dataset.item$);
  }
  _demoCurrentUser(e) {
    this.accountType = e.target.name;

  }
 
  _pagenavigation() {
    window.history.pushState({}, null, '/routename');
    window.dispatchEvent(new CustomEvent("location-changed"));

  }
  static get properties() {
    return {
      demoIronajaxid: {
        type: String,
        value: ""
      },
      demoArray: {
        type: Array,
        value: []

      },
      demoString: {
        type: String,
        value: ""
      },
      demoNumber: {
        type: Number,
        value: ""

      },
      demobaseUrl: {
        type: String,
        value: ""
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
    // alert(page);
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be an empty string.
    // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'login';
    } else if (['dashboard','login', 'payee', 'demo2'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      //this.page = 'pagenotfound';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'dashboard':
        import('./my-dashboard.js');
        break;
        case 'login':
          import('./my-login.js');
          break;
          case 'payee':
            import('./my-payee.js');
            break;
      case 'pagenotfound':
        import('./my-pagenotfound.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
