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
class DashBoard extends PolymerElement {

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
      </style>

        <!-- shadow DOM for your element -->
   
 
  <!-- data bindings in shadow DOM -->
  

<paper-card >
<!--alert-dialog-->

<paper-dialog id="alertdialog">
  <h2>[[alertMsg]]</h2>
  <paper-button class="custom indigo customizedDangercss" style="float:right" dialog-confirm autofocus>OK</paper-button>
 </paper-dialog>

  
<!--Search Result Dialog-->
<paper-dialog id="actions">
          <div><h2 style="color:rgba(255, 98, 0, 0.66);">Found Record Details:</h2></div>
          <div>Address<span>: [[foundRecordDetails.address]]</span></div>
          <div>ApplicantIncome<span>: [[foundRecordDetails.applicantIncome]]</span></div>
          <div>Address<span>: [[foundRecordDetails.address]]</span></div>
          <div>FirstName<span>: [[foundRecordDetails.firstName]]</span></div>
          <div>LastName<span>: [[foundRecordDetails.lastName]]</span></div>
          <div>ApplicantIncome<span>: [[foundRecordDetails.applicantIncome]]</span></div>
          <div>LoanAmount<span> :[[foundRecordDetails.loanAmount]]</span></div>
          <div>Status<span>: [[foundRecordDetails.firstName]]</span></div>
      <div class="buttons">
            <paper-button dialog-dismiss>OK</paper-button>
           <!-- <paper-button dialog-confirm autofocus>Accept</paper-button>-->
          </div>
</paper-dialog>
<!-->
  <div class="card-content" style="background-color:beige">


<div>
          <paper-input label="Search For Application" style="width:75%"  value="{{searchText}}"></paper-input>
          <paper-button class="custom indigo customizedcss"  style="margin-left:66%;float:right;margin-top:-5%;" 
                  on-click="_searchRecord" >Find</paper-button>
                 
</div>
          <paper-button raised class="indigo" style="width:100%;background-color:paleturquoise!important;color:black" on-click="_showForm">Create New Application</paper-button>
          <paper-dropdown-menu label="Please Choose Profile" style="width: 100%;">
                <paper-listbox slot="dropdown-content" class="dropdown-content">
                
                      <paper-item   name="assosor"  id="assosor"  on-click="_slectedRole">Assosor</paper-item>
                      <paper-item   name="approver" id="approver" on-click="_slectedRole">Approver</paper-item>
                      <paper-item  name="lendingmanager"   id="lending_manager" on-click="_slectedRole">Lend Manager</paper-item>
               
                </paper-listbox>
          </paper-dropdown-menu>
  </div>
  <template is="dom-if" if="{{showFormFlag}}">
            <div class="card-actions"  style="margin:20px;border:5px solid beige; background-color:bisque">
              <p>Loan Applocation Form( Status : [[appliactionStatus]])</p>
              <div class="horizontal justified">
            <iron-form id="loanappliactionForm">
              <form>
                                <paper-input  value="{{firstName}}" always-float-label label="FirstName" error-message="Enter First Name" auto-validate required></paper-input>
                                <paper-input  value="{{lastName}}" always-float-label label="LastName" error-message="Enter First Name" auto-validate required></paper-input>
                                <paper-input  value="{{address}}" always-float-label label="Address" error-message="Enter Address" auto-validate required></paper-input>
                              
                                <paper-input type="number" value="{{loanAmount}}" always-float-label label="Amount" error-message="Enter Amount" auto-validate required></paper-input>
                                <paper-input type="number" value="{{applicantIncome}}" always-float-label label="ApplicantIncome" error-message="Enter applicantIncome" auto-validate required></paper-input>
                              <p>CreditStatus: [[creditStatus]]</p> 
                            </br>
                            <paper-button class="custom indigo customizedcss"  
                            on-click="_submitForm">Save</paper-button>


                            <template is="dom-if" if="{{saveAandApproveFlag}}">
                                    <paper-button class="custom indigo customizedcss"  
                                    on-click="_submitForm">Approve</paper-button>
                            </template>

                            
                      <template is="dom-if" if="{{flahAll}}">
                            <paper-button class="custom indigo customizedcss"  
                            on-click="_submitForm">Fund And Complete</paper-button>
                    </template>
                            <paper-button toggles class="custom indigo customizedDangercss" class="green" on-click="_resetForm">Reset</paper-button>
                            </form>
              
              </div>
              </template>



    <paper-button class="cafe-reserve" style="width: 100%; background-color: white;">
              <paper-card  style="background-color:beige; color:#ff6200!important;">
              <div class="card-content">
              <h4>New Status Application</h4>
              
              <template is="dom-repeat" items="{{newStatusApp}}">
                     <div><span>ApplicationId:[[item.applicationId]]</span></div>
                     <div>FirstName: <span>[[item.firstName]]</span></div>
                     <div><span>LoanAmount:[[item.loanAmount]]</span></div>
                    
            </template>
            </div>
      </paper-card>

      <paper-card  style="background-color:beige; color:#ff6200!important">
      <div class="card-content">
      <h4>Approved Status Application</h4>
      <template is="dom-repeat" items="{{approvedStatusApp}}">
      <div><span>ApplicationId:[[item.applicationId]]</span></div>
      <div>FirstName: <span>[[item.firstName]]</span></div>
      <div><span>LoanAmount:[[item.loanAmount]]</span></div>
    </template>
    </div>
</paper-card>


<paper-card  style="background-color:beige; color:#ff6200!important">
          <div class="card-content">
          <h4>Funded Status Application</h4>
          <template is="dom-repeat" items="{{fundedStatusApp}}">
          <div><span>ApplicationId:[[item.applicationId]]</span></div>
          <div>FirstName: <span>[[item.firstName]]</span></div>
          <div><span>LoanAmount:[[item.loanAmount]]</span></div>
          </template>
          </div>
</paper-card>

    
    
    </paper-button>
  </div>

  <iron-ajax
  id="getProfileajaxid"
  on-response="_getProfileajaxidResponseHandler"
  on-error ="_getProfileHandleError"
  debounce-duration="300">
</iron-ajax>
                <iron-ajax
                id="getAllApplicationajaxid"
                on-response="_getAllApplicationResponseHandler"
                on-error ="_getAllApplicationHandleError"
                debounce-duration="300">
              </iron-ajax>
            <iron-ajax
                    id="ajaxid"
                    on-response="_responseHandler"
                    on-error ="_handleError"
                    debounce-duration="300">
            </iron-ajax>

            <iron-ajax
            id="ajaxPost"
            on-response="_postresponseHandler"
            on-error ="_handleError"
            debounce-duration="300">
    </iron-ajax>
    </iron-form> 
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
        value: "http://10.117.189.210:8090/app"
      },
      subUrl:
      {
        type: String,
        value: `/login`
      },
      alertMsg: {
        type: String,
        value: "You have been successfully."
      },
      foundRecordDetails:{
        type:Object, 
        value:{}
      },
      newStatusApp:{
        type:Array, 
        value:[]
      },
      approvedStatusApp:{
        type:Array, 
        value:[]
      },
      fundedStatusApp:{
        type:Array, 
        value:[]
      },
      showFormFlag:{
        type:Boolean,
        value:false

      },
      flahAll:{
        type:Boolean,
        value:false
      },
      saveAandApproveFlag:{
        type:Boolean,
        value:false
      },
    }
  }

  constructor() {
    super();
    this.greeting = 'Hello! Login Demo';
  }
  connectedCallback(){
    super.connectedCallback();
    this.getAttributeNames();
    let requiredData = {
      method: "get",
      url: `${this.baseUrl}/getAllApplication`,
  
    }
    this.getAllApplication(requiredData);

  }
  _showForm(){
    this.showFormFlag = !this.showFormFlag;

  }
  getAllApplication(data){

  
    let ajaxRef = this.$.getAllApplicationajaxid;
    ajaxRef.method = data.method;
    ajaxRef.url = data.url,
    ajaxRef.contentType = "application/json"
    ajaxRef.generateRequest();
}
_getAllApplicationResponseHandler(event){
  const response = event.detail.response;
  var global=this;
  if(response){
    console.log(this);
    
    response.filter(function(currentValue, index, arr){
       console.log(this, global.newStatusApp)
      if(currentValue.status== "New"){
       
        global.push('newStatusApp', currentValue)
      }else if(currentValue.status== "Approved"){
        //this.approvedStatusApp = (currentValue);
        global.push('approvedStatusApp', currentValue);
      }else{
        //this.fundedStatusApp = (currentValue);
        global.push('fundedStatusApp', currentValue)
      }

    })

    console.log(global.approvedStatusApp)
   // let newAppData =
    //alert('Found All Data');

  }

}

_getAllApplicationHandleError(){
  alert('Some Thing went Wrong');
}
  _searchRecord(){
    ///searchApplicationById/3
    let id= this.searchText;
    if(id){
      let requiredData = {
        method: "get",
        url: `${this.baseUrl}/searchApplicationById/${id}`,
      }
      this._makeApiGetCall(requiredData);

    }else{
  
     // this.$.search.open();
     this.alertMsg = "Please Enter Application Id"
     this.$.alertdialog.open();
      
    }
  
  }
  _submitForm() {
    //{firstName, lastName, address, status, loanAmount, applicantIncome, creditStatus}
    //const isValidate = this.$.loanappliactionForm.validate();
   // console.log(this.$.loanappliactionForm.validate())
    if (true) {
      const jsonBody = {
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        loanAmount:this.loanAmount,
        applicantIncome:this.applicantIncome,
        creditStatus:this.creditStatus
      }
      let requiredData = {
        method: "post",
        url: `${this.baseUrl}/saveApplication`,
        body: jsonBody
      }
      this._makePostApiCall(requiredData);
    }
  }


  _makePostApiCall(data) {
    let ajaxRef = this.$.ajaxPost;
      ajaxRef.method = data.method;
      ajaxRef.url = data.url,
      ajaxRef.body = data.body;
      ajaxRef.contentType = "application/json"
      ajaxRef.generateRequest();
  }

  _postresponseHandler(event){
    const response = event.detail.response;
    if(response.statusMessage=='success'){
     // this.$.loanappliactionForm.reset();
       // this.$.search.open();
     this.alertMsg = "Loan  Application Submitted  Successfully"
     this.$.alertdialog.open();
     // alert('Loan From Application Dada Saved Successfully');

    }
  }

  _resetForm() {
    this.$.loanappliactionForm.reset();
  }
getProfileByProfileName(){
  let requiredData = {
    method: "get",
    url: `${this.baseUrl}/getProfileByProfileName`,
  }
  this._makeApiGetCall(requiredData);

}
  
  greetMe() {
    console.log(this.greeting);
  }

  _slectedRole(event){
    const profileName = event.target.id;
    let ajaxRef = this.$.getProfileajaxid;
    ajaxRef.method = 'get';
    ajaxRef.url = `${this.baseUrl}/getProfileByProfileName/${profileName}`,
    ajaxRef.contentType = "application/json"
    ajaxRef.generateRequest();

    
   
  }
  _getProfileajaxidResponseHandler(event){
    const response = event.detail.response;
    const t = response[0];
    if(t.profileName=='assosor' ){
      this.saveAandApproveFlag = false;
      this.flahAll = false;
    }else if(t.profileName=='approver'){
      this.saveAandApproveFlag = true;
      this.flahAll = false;
    }else{
      this.flahAll = true;
      this.saveAandApproveFlag = true;
      
    }
    

  }
  
  _makeApiGetCall(data) {
    let ajaxRef = this.$.ajaxid;
      ajaxRef.method = data.method;
      ajaxRef.url = data.url,
      ajaxRef.contentType = "application/json"
      ajaxRef.generateRequest();
  }
  
  _responseHandler(event) {
    const response = event.detail.response;
   
    if(response.statusMessage=='success'){
       this.foundRecordDetails =event.detail.response;
      this.$.actions.open();
    }


    
    
  }

  _handleError() {
    alert('_handleError');
  }

}

// Register the x-custom element with the browser
customElements.define('dash-board', DashBoard);