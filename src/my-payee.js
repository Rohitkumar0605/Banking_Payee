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
class PayeeElement extends PolymerElement {

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
  #validateOtpDialog{
    margin-top: 7%;
    margin-left: 27%;
    width: 30%;
    border:8px solid beige

  } 
      </style>

        <!-- shadow DOM for your element -->
   
 
  <!-- data bindings in shadow DOM -->
  

<paper-card >

<!--alert-dialog-->

<!--<paper-dialog id="alert">
  <h2>[[alertMsg]]</h2>-->
  <paper-button class="custom indigo customizedDangercss" style="float:right" dialog-confirm autofocus>OK</paper-button>
 </paper-dialog>
  <div class="card-content" style="background-color:beige">
  <paper-tabs selected="0">
        <paper-tab id="addpayee"  data-item$="addpayee" on-click="_switchBetweenLoginAndCreate">Add Payee</paper-tab>
        <paper-tab id="upadtepayee" data-item$="upadtepayee" on-click="_switchBetweenLoginAndCreate">Update Payee</paper-tab>
        <paper-tab id="deletepayee" data-item$="deletepayee" on-click="_switchBetweenLoginAndCreate">Delete Payee</paper-tab>
          
</paper-tabs>
  </div>

  <!--SignIn  Form End-->
  <template is="dom-if" if="{{showAddPayeeForm}}">
          <div class="card-actions"  style="margin:20px;border:5px solid beige; background-color:bisque">
              <p>Add Payee Form</p>
              <div class="horizontal justified">
            <iron-form id="addPayeeFrom">
            <!--{payeeName,branch,accountNumber,accountType,loginId,contactNumber}-->
              <form>
                            <paper-input  value="{{payeeName}}" always-float-label label="PayeeName" error-message="Enter First Name" auto-validate required></paper-input>
      
                            <paper-input  value="{{branch}}" always-float-label label="Branch" error-message="Enter First Name" auto-validate required></paper-input>
                            <paper-input  value="{{accountNumber}}" always-float-label label="AccountNumber" error-message="Enter First Name" auto-validate required></paper-input>
                            <paper-input  value="{{contactNumber}}" always-float-label label="ContactNumber" error-message="Enter First Name" auto-validate required></paper-input>
                          
                            <paper-dropdown-menu label="Please Choose Payee" style="width: 100%;">
                                  <paper-listbox slot="dropdown-content" class="dropdown-content">
                                        <paper-item    id="saving"  on-click="_selectedAccountType">Saving</paper-item>
                                        <paper-item    id="current" on-click="_selectedAccountType">Current</paper-item>
                                        <paper-item    id="demate" on-click="_selectedAccountType">Demate</paper-item>
                                  </paper-listbox>
                            </paper-dropdown-menu>
                            
                       <template is="dom-if" if="{{showBtnToAddPayee}}">
                            <!-- Only admins will see this. -->
                            <paper-button class="custom indigo customizedcss"  
                            on-click="_addPayee">Add Payee</paper-button>
                          </template>
                           

                            <paper-button class="custom indigo customizedcss"  
                            on-click="_generateOtp">Generate OTP</paper-button>
                            <paper-button toggles class="custom indigo customizedDangercss" class="green" on-click="_resetForm">Reset</paper-button>
                </form>
                
              </iron-form> 
        </div>
    </template>
    <!--SignIn  Form End-->


    <!--Upadte Payee-->
    <template is="dom-if" if="{{showUpdatePayeeForm}}">
    <div class="card-actions"  style="margin:20px;border:5px solid beige; background-color:bisque">
            <p>Update Payee</p>
            <div class="horizontal justified">
          <iron-form id="updatePayeeForm">
            <form>
            <paper-dropdown-menu label="Please Choose Payee" style="width: 100%;">
                    <paper-listbox slot="dropdown-content" class="dropdown-content">
                    <template is="dom-repeat" items="{{payeList}}">
                    <paper-item     id="[[item.payeeId]]" name="[[item.accountNumber]]"  on-click="_currentPayeeToUpdatePayee">[[item.payeeName]]</paper-item>
             </template>
            </paper-listbox>
      </paper-dropdown-menu>  
      <paper-input  value="{{accountNumber}}" always-float-label label="AccountNumber" error-message="Enter First Name" auto-validate required></paper-input>
                           
      
                              <paper-button class="custom indigo customizedcss"  
                          on-click="_upadtePayee">Update</paper-button>
                          <paper-button class="custom indigo customizedcss"  
                          on-click="_generateOtp">Generate OTP</paper-button>
                          <paper-button toggles class="custom indigo customizedDangercss" class="green" on-click="_resetForm">Reset</paper-button>
              </form>
              
                </iron-form> 
          </iron-form> 
      </div>
    </template>
    
    <!--Account Creation Form End-->


    <!--Account Creation Form start-->
    <template is="dom-if" if="{{showDeletePayeeForm}}">
    <div class="card-actions"  style="margin:20px;border:5px solid beige; background-color:bisque">
            <p>Delete Payee From</p>
            <div class="horizontal justified">
          <iron-form id="updatePayeeForm">
            <form>
                        <paper-dropdown-menu label="Please Choose Payee" style="width: 100%;">
                        <paper-listbox slot="dropdown-content" class="dropdown-content">
                        <template is="dom-repeat" items="{{payeList}}">
                        <paper-item   name="assosor"  id="[[item.payeeId]]"  on-click="_currentPayeeToDeletePayee">[[item.payeeName]]</paper-item>
                           
                         </template>
                             
                        </paper-listbox>
                  </paper-dropdown-menu>  
                        

                          <paper-button class="custom indigo customizedcss"  
                          on-click="_deletePayee">Delete Payee</paper-button>
                  
                          <paper-button toggles class="custom indigo customizedDangercss" class="green" on-click="_resetForm">Reset</paper-button>
              </form>
              
                </iron-form> 
          </iron-form> 
      </div>
    </template>
    
    <!--Account Creation Form End-->
  </div>
      
  

  <!--Details  Dialog Start-->
<paper-dialog id="createdAccountDetailsDialog">
                <div><h2 style="color:rgba(255, 98, 0, 0.66);">Found Record Details:</h2></div>
                <div>Address<span>: [[createdAccountDetails.address]]</span></div>
                <div>ApplicantIncome<span>: [[createdAccountDetails.applicantIncome]]</span></div>
                <div>Address<span>: [[createdAccountDetails.address]]</span></div>
                <div>FirstName<span>: [[createdAccountDetails.firstName]]</span></div>
                <div>LastName<span>: [[createdAccountDetails.lastName]]</span></div>
                <div>ApplicantIncome<span>: [[createdAccountDetails.applicantIncome]]</span></div>
                <div>LoanAmount<span> :[[createdAccountDetails.loanAmount]]</span></div>
                <div>Status<span>: [[createdAccountDetails.firstName]]</span></div>
            <div class="buttons">
                  <paper-button dialog-dismiss>OK</paper-button>
                <!-- <paper-button dialog-confirm autofocus>Accept</paper-button>-->
                </div>
</paper-dialog>

<!--Details  Dialog End-->




<!--Noraml Alert dialog-->
    <paper-dialog id="alert">
            <h2>[[alertMsg]]</h2>
            <paper-button class="custom indigo customizedDangercss" style="float:right" dialog-confirm autofocus>OK</paper-button>
</paper-dialog>


  <!--Model Dialog To Get Otp-->
  <paper-dialog id="validateOtpDialog">
        <h2>Verify OTP</h2>
       <iron-form id="otoValDialog">
        <form>
          <paper-input  value="{{otpforpayee}}" always-float-label label="Validate OTP" error-message="Enter First Name" auto-validate required></paper-input>
    </form>
    </iron-form>
    <paper-button class="custom indigo customizedDangercss" style="float:right"  on-click="_VerifyOtp">Verify</paper-button>

  </paper-dialog>



  <iron-ajax
        id="ajaxSinUp"
        on-response="_signUpHandler"
        on-error ="_errorHandler"
        debounce-duration="300">
</iron-ajax> 

  <iron-ajax
        id="_addPayeeAjax"
        on-response="_addPayeeHandler"
        on-error ="_errorHandler"
        handle-as="text"
        debounce-duration="300">
</iron-ajax> 
  <iron-ajax
        id="getOtpAjax"
        on-response="_getOtpaddPayeeHandler"
        on-error ="_errorHandler"
        handle-as="text"
        debounce-duration="300">
  </iron-ajax> 


  <iron-ajax
  id="payeeListAjax"
  on-response="_getAllPayePayeeHandler"
  on-error ="_errorHandler"
  debounce-duration="300">
</iron-ajax> 

<iron-ajax
        id="deletePayee"
        on-response="_deletePayeePayeeHandler"
        on-error ="_errorHandler"
        debounce-duration="300"
        handle-as="text">
</iron-ajax> 
<iron-ajax 
        id="verifyOtpAjax"
        on-response="_verifyPayeeHandler"
        handle-as="text"
        on-error ="_errorHandler"
        debounce-duration="300"
        handle-as="text">
</iron-ajax> 
<iron-ajax 
        id="updatePayeeAjax"
        on-response="_updatePayeeHandler"
        handle-as="text"
        on-error ="_errorHandler"
        debounce-duration="300"
        handle-as="text">
</iron-ajax> 




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
      showAddPayeeForm:{
        type:Boolean,
        value:true
      },
      showUpdatePayeeForm:{
        type:Boolean,
        value:false
      },
      showDeletePayeeForm:{
        type:Boolean,
        value: false
      },
      createdAccountDetailsDialog:{
        type:Object, 
        value:{}
      },
      loggedInUsrDetails:{
        type:Object, 
        value:{}
      }
      ,
      selctedaccountType:{
        type:String, 
        value:""
      },
      payeList:{
        type:Array, 
        value:[]
      },
      payeeId:{
        type:String, 
        value:""
      },
      showBtnToAddPayee:{
        type:Boolean,
        value:false
      }
      
    }
  }

  constructor() {
    super();
    
  }
  connectedCallback(){
    super.connectedCallback();
    //this.loggedInUsrDetails= JSON.parse(sessionStorage.getItem("userDetails"));
    //sessionStorage.setItem("userDetails", JSON.stringify());
   
    this.getAllPaye();

  }

  ready(){
    super.ready();
    this.$.validateOtpDialog.close();
  }
 
_getAllPayePayeeHandler(event){
  const response = event.detail.response;
  //this.otpforpayee = 
  this.payeList =response;
  this.$.validateOtpDialog.open();
}
  getAllPaye()
  {
    let ajaxRef = this.$.payeeListAjax;
    ajaxRef.method = "get";
    ajaxRef.url = `${this.baseUrl}/getAllPayee`,
    ajaxRef.contentType = "application/json"
    ajaxRef.generateRequest();
  }

  _currentPayeeToDeletePayee(event){
   
   this.payeeId = event.target.id;
   //alert('_currentPayeeToDeletePayee'+this.payeeId);
    
   //_deletePayee
  }

  _deletePayee(){//deletePayee
    if(this.payeeId){
      let ajaxRef = this.$.deletePayee;
      ajaxRef.method = "delete";
      ajaxRef.url = `${this.baseUrl}/deletePayee/${this.payeeId}`,
      ajaxRef.contentType = "application/text"
      ajaxRef.generateRequest();
    }else{
      //this.$.alertMsg = "Please Select Payee ";
      //this.$.validateOtpDialog.open();
      alert('Please Select Payee ');

    }
  
  }
  _deletePayeePayeeHandler(event){
    const response = event.detail.response;
   // alert,alertMsg
   if(response=="Successfully deleted"){
    //this.$.alertMsg = "Payee Successfully Deleted";
    //this.$.validateOtpDialog.open();
    this.payeList =[];
    alert('Payee Successfully Deleted');

   }

  }

  _selectedAccountType(event){
    this.selctedaccountType = event.target.id;
    //alert("profileName"+this.selctedaccountType);
   
  }
  _switchBetweenLoginAndCreate(event){
    console.log('_switchBetweenLoginAndCreate', event.target.dataset.item$);
    let falg = event.target.dataset.item$;
    if(event.target.dataset.item$=="addpayee"){
      this.showAddPayeeForm = true;
      this.showUpdatePayeeForm = false;
      this.showDeletePayeeForm = false;
      //this.$.signInFormDialog.open();
    }else if(event.target.dataset.item$=="upadtepayee"){
      this.showAddPayeeForm = false;
      this.showUpdatePayeeForm = true;
      this.showDeletePayeeForm = false;
     // this.$.signUpFormDialog.open();
      
    }else if(falg=="deletepayee"){
      this.showDeletePayeeForm = true;
      this.showAddPayeeForm = false;
      this.showUpdatePayeeForm = false;

    }
  }

  _generateOtp(){
    let ajaxRef = this.$.getOtpAjax;
    ajaxRef.method = "post";
    ajaxRef.url = `${this.baseUrl}/generateOtp`,
    ajaxRef.contentType = "application/json"
    ajaxRef.generateRequest();
  }

  _getOtpaddPayeeHandler(event){
    const response = event.detail.response;
     
if(response=="Successfully generated"){
  alert('OTP  Successfully generated, Please Check Email.');
  this.$.validateOtpDialog.open();
}
    //this.$.validateOtpDialog.open();
  }


  //otpforpayee,verifyOtpAjax,_verifyPayeeHandler
  _VerifyOtp(){
    //alert(this.otpforpayee);
    let ajaxRef = this.$.verifyOtpAjax;
    ajaxRef.method = "get";
    ajaxRef.url = `${this.baseUrl}/validateOtp/${this.otpforpayee}`,
    ajaxRef.contentType = "application/json"
    ajaxRef.generateRequest();

  }
  _verifyPayeeHandler(event){
    const response = event.detail.response;
    if(response=="Successfully validated"){
      alert("Successfully validated ");
      this.$.validateOtpDialog.close();
      this.showBtnToAddPayee =true;
    }else{
      alert("OTP Is not Valid");
    }

  }
  //{payeeName,branch,accountNumber,accountType,loginId,contactNumber}
  _addPayee() {
    if (true) {
      const jsonBody = {
            payeeName: this.payeeName,
            branch: this.branch,
            accountNumber: this.accountNumber,
            loginId: localStorage.loggedInId,
            contactNumber: this.contactNumber,
            accountType:this.selctedaccountType
      }
      let ajaxRef = this.$._addPayeeAjax;
      ajaxRef.method = "post";
      ajaxRef.url = `${this.baseUrl}/addPayee`,
      ajaxRef.body = jsonBody;
      ajaxRef.contentType = "application/json"
      ajaxRef.generateRequest();
    }
  }

  _addPayeeHandler(event){
    const response = event.detail.response;
    if(response=="Successfully added"){
          alert("Payee Added Successfully");
          this.$.addPayeeFrom.reset();
          window.history.pushState({}, null, '/payee');
          this.otpforpayee ="";
          window.dispatchEvent(new CustomEvent("location-changed"));
    }else{
      alert("Failed Payee Adde ");

    }
  }
  _signUpHandler(event){
    const response = event.detail.response;
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

  _currentPayeeToUpdatePayee(event){
    this.payeeId = event.target.id;
    this.accountNumber = event.target.name;
   
 
   }
  _upadtePayee() {
  
      let ajaxRef = this.$.updatePayeeAjax; 
      ajaxRef.method = 'put';
      ajaxRef.url = `${this.baseUrl}/updatePayee/${this.payeeId}/${this.accountNumber}`,
      ajaxRef.contentType = "application/json"
      ajaxRef.generateRequest();
    
  }

  _updatePayeeHandler(event){
    const response = event.detail.response;
    if(response=="Successfully updated"){
      createdAccountDetailsDialog = response;
      alert("Successfully Added Payee");
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
customElements.define('payee-element', PayeeElement);