/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
    :host {
      --app-primary-color: #ff6200!important;
      --app-secondary-color: #1f1f1f;
      --app-paper-dialog-border: 1px solid red;
      --app-header-layout-bg: #f1f1f1!important;
      --app-bottom-border-color: rgba(0,0,0,0.8)!important;

      --app-active-boutton-bg: #ff6200!important
    }
    paper-card{
      margin: 3%;
    }
    
    
    paper-button.custom:hover {
      background-color: red;
      height:40px;
     
    }
    paper-button.custom {
      background-color: #ff6200!important;
      height:35px;
      padding:5px;
      border:1px solid red;
    }

    #asb:hover{
      background-color: #ff6200!important;
      color:white;
    }
    .card:hover {
      border:1px solid  #ff6200!important;
    }
      

     
    div .card .card-actions{
      background-color:rgba(0,0,0,0.8);
      color:#fff;
    }
      iron-selector[role="navigation"] a[name="dashboard"]:hover {
        background-color: #ff6200!important;
      }
      paper-input-container[id="container"]{
        width:970px;
      }
      paper-button.activeBtn {
          background-color: red;
          color: white !important;
        
      }
      paper-button.custom:hover {
        background-color: red;
      }
      paper-button.pink {
        color: var(--paper-pink-a200);
  
      }
      
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
