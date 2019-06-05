import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-toast/paper-toast.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
// Import template repeater
import '@polymer/polymer/lib/elements/dom-repeat.js';


// Define the element's API using an ES2015 class
class LoginElement extends PolymerElement {

  // Define optional shadow DOM template
  static get template() {
    return html`
      <style>
        /* CSS rules for your element */
        paper-card{
          margin:4%;
          margin-left:6%;
          width:90%;
        }
        paper-card:hover{
         border-bottom: 3px solid #ff6200; 
        
         cursor:pointer;
        
        }
.customizedcss{
  background-color:rgba(0,0,0,0.8);
  color:#fff;

}
   
.customizedDangercss{
  background-color:red;
  color:rgba(255, 98, 0, 0.66);
  color:#fff;

}
  #actions{
    margin-top: 7%;
    margin-left: 27%;
    width: 30%;
    border:8px solid beige
  }     
  #alertdialog{
    color:#ff6200!important;
    min-width: 31%;
    margin-top:-28%;
    position: fixed;
    border: 6px solid beige;
  }
  #createdAccountDetailsDialog{
    color:#ff6200!important;
    border: 6px solid beige;

  }
      </style>

        <!-- shadow DOM for your element -->
   
 
  <!-- data bindings in shadow DOM -->
  

<paper-card >
<!--alert-dialog-->

<paper-dialog id="alertdialog">
  <h2>[[alertMsg]]</h2>
  <paper-button class="custom indigo customizedDangercss" style="float:right" dialog-confirm autofocus>OK</paper-button>
 </paper-dialog>
  <div class="card-content" style="background-color:beige">
  <paper-tabs selected="0">
        <paper-tab id="login"  data-item$="login" on-click="_switchBetweenLoginAndCreate">Login</paper-tab>
        <paper-tab id="create" data-item$="create" on-click="_switchBetweenLoginAndCreate">Create Account</paper-tab>
          
</paper-tabs>
  </div>

  <!--SignIn  Form End-->
  <template is="dom-if" if="{{showLoginForm}}">
          <div class="card-actions"  style="margin:20px;border:5px solid beige; background-color:bisque">
              <p>Login From</p>
              <div class="horizontal justified">
            <iron-form id="loginForm">
              <form>
                            <paper-input  value="{{username}}" always-float-label label="User" error-message="Enter First Name" auto-validate required></paper-input>
                            <paper-input type="password" value="{{password}}" always-float-label label="Password" error-message="Enter First Name" auto-validate required></paper-input>
                            <paper-button class="custom indigo customizedcss"  
                            on-click="_loginAuthication">Login</paper-button>
                            <paper-button toggles class="custom indigo customizedDangercss" class="green" on-click="_resetForm">Reset</paper-button>
                </form>
                
              </iron-form> 
        </div>
    </template>
    <!--SignIn  Form End-->


    <!--Account Creation Form start-->
    <template is="dom-if" if="{{showSignUpForm}}">
    <div class="card-actions"  style="margin:20px;border:5px solid beige; background-color:bisque">
            <p>Creeate New Account From</p>
            <div class="horizontal justified">
          <iron-form id="ceateAccountForm">
            <form>
                              <paper-input  value="{{firstName}}" always-float-label label="FirstName" error-message="Enter First Name" auto-validate required></paper-input>
                              <paper-input  value="{{lastName}}" always-float-label label="LastName" error-message="Enter First Name" auto-validate required></paper-input>
                              <paper-input type="number" value="{{accountNumber}}" always-float-label label="AccountNumber" error-message="Enter First Name" auto-validate required></paper-input>
                            
                              <paper-input type="email" value="{{emailId}}" always-float-label label="EmailId" error-message="Enter First Name" auto-validate required></paper-input>
                              <paper-input  value="{{pancard}}" always-float-label label="Pancard" error-message="Enter First Name" auto-validate required></paper-input>
                              <paper-input  type="number" value="{{contactNumber}}" always-float-label label="ContactNumber" error-message="Enter First Name" auto-validate required></paper-input>
                              

                          <paper-button class="custom indigo customizedcss"  
                          on-click="_submitCreateAccountForm">Create Account</paper-button>
                  
                          <paper-button toggles class="custom indigo customizedDangercss" class="green" on-click="_resetForm">Reset</paper-button>
              </form>
              
                </iron-form> 
          </iron-form> 
      </div>
    </template>
    <!--Account Creation Form End-->

  </div>
                <iron-ajax
                      id="ajaxSinUp"
                      on-response="_signUpHandler"
                      on-error ="_errorHandler"
                      debounce-duration="300">
              </iron-ajax>  


              <iron-ajax
                id="signInAjax"
                on-response="_signInHandler"
                on-error ="_errorHandler"
                debounce-duration="300">
            </iron-ajax> 
<!--Noraml Alert dialog-->
    <paper-dialog id="alertdialog">
            <h2>[[alertMsg]]</h2>
            <paper-button class="custom indigo customizedDangercss" style="float:right" dialog-confirm autofocus>OK</paper-button>
  </paper-dialog>

  <!--Details  Dialog Start-->
<paper-dialog id="createdAccountDetailsDialog">
                <div><h2 style="color:rgba(255, 98, 0, 0.66);">Created Account Details:</h2></div>
                <div>AccountId<span>: [[createdAccountDetails.account.accountId]]</span></div>
                <div>LoggedIn User Id<span>: [[createdAccountDetails.loginId]]</span></div>
                <div>Password has been sent to your registered email id. Please Check</span></div>
            <div class="buttons">
                  <paper-button dialog-dismiss>OK</paper-button>
                <!-- <paper-button dialog-confirm autofocus>Accept</paper-button>-->
                </div>
</paper-dialog>

<!--Details  Dialog End-->
</paper-card>
    `;
  }

  // Declare properties for the element's public API
  static get properties() {
    return {
      creditStatus:{
        type:String,
        value :"Not Approved"
      },
      appliactionStatus:{
        type:String,
        value:"New"
      },
      greeting: {
        type: String
      },
      baseUrl:
      {
        type: String,
        value: "http://192.168.43.22:8090/app"
      },
      subUrl:
      {
        type: String,
        value: `/login`
      },
      alertMsg: {
        type: String,
        value: ""
      },
      showLoginForm:{
        type:Boolean,
        value:true
      },
      showSignUpForm:{
        type:Boolean,
        value:false
      },
      createdAccountDetailsDialog:{
        type:Object, 
        value:{}
      }
    }
  }

  constructor() {
    super();
    
  }
  connectedCallback(){
    super.connectedCallback();
   //this loggedInUsrDetails= JSON.parse(sessionStorage.getItem("userDetails"));
    //sessionStorage.setItem("userDetails", JSON.stringify());

  }
  _switchBetweenLoginAndCreate(event){
    console.log('_switchBetweenLoginAndCreate', event.target.dataset.item$);
    let falg = event.target.dataset.item$;
    if(falg=='login'){
      this.showLoginForm = true;
      this.showSignUpForm = false;
      //this.$.signInFormDialog.open();
    }else{
      this.showLoginForm = false;
      this.showSignUpForm = true;
     // this.$.signUpFormDialog.open();
      
    }
  }
  _loginAuthication() {
   // const isValidate = this.$.loginForm.validate();
   // console.log(this.$.loginForm.validate())
    if (this.username) {
      const jsonBody = {
        userName: this.username,
        password: this.password,
      }
      let ajaxRef = this.$.signInAjax;
      ajaxRef.method = "get";
      ajaxRef.url = `${this.baseUrl}/loginUser/${jsonBody.userName}/${jsonBody.password}`,
      ajaxRef.body = jsonBody;
      ajaxRef.contentType = "application/json"
      ajaxRef.generateRequest();
    }else{
       //alertdialog,alertMsg
       this.alertMsg ="Please Enter User Credetails"
       this.$.alertdialog.open();

    }
  }


 

  _signInHandler(event){
    const response = event.detail.response;
    if(response.actionMessage== "success"){
          // Store
          const response = event.detail.response;
          sessionStorage.setItem("userDetails", JSON.stringify());
          localStorage.loggedInId= response.loginId;
          window.history.pushState({}, null, '/payee');
          window.dispatchEvent(new CustomEvent("location-changed"));
    }else{
      //alertdialog,alertMsg
      this.alertMsg ="User is not existing"
      this.$.alertdialog.open();

    }
    

  }
  _signUpHandler(event){
    const response = event.detail.response;
    if(response.actionMessage=="success"){
      this.createdAccountDetails =response;
      this.$.createdAccountDetailsDialog.open();

    }
  }
  _errorHandler(){
    alert('error');
  }

  _resetForm() {
    this.$.loginForm.reset();
  }
  _responseHandler(event) {
    const response = event.detail.response;
  }

  _handleError() {
    alert('_handleError');
  }

  _submitCreateAccountForm() {
  //  const isValidate = this.$.ceateAccountForm.validate();
   // console.log(this.$.ceateAccountForm.validate())
   
   //window.history.pushState({}, null, '/list');
  // window.dispatchEvent(new CustomEvent("location-changed"));
   
   //{firstName,lastName,accountNumber,pancard,emailId,contactNumber}
    if (true) {
      const jsonBody = {
        firstName: this.firstName,
        lastName: this.lastName,
        accountNumber: this.accountNumber,
        pancard: this.pancard,
        emailId:this.emailId,
        contactNumber:this.contactNumber
      }
      let ajaxRef = this.$.ajaxSinUp;
      ajaxRef.method = 'post';
      ajaxRef.url = `${this.baseUrl}/createAccount`,
      ajaxRef.body = jsonBody;
      ajaxRef.contentType = "application/json"
      ajaxRef.generateRequest();
    }
  }


  

  _postresponseHandler(event){
    const response = event.detail.response;
    if(response.status=="success"){
      createdAccountDetailsDialog = response;
    }
  }


}

// Register the x-custom element with the browser
customElements.define('login-element', LoginElement);