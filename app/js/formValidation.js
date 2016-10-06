'use strict';
  $(document).ready(function(){

    // validate welcome-form
    $('#welcome-form').validate({ // initialize plugin
    ignore:":not(:visible)",
      rules: {
        "email": {
          required: true,
          email: true
        },
        "password": {
          required: true,
        }
      },
      messages: {
        'email': {
          required: "Enter email",
          email: "Enter valid email",
        },
        'password': {
          required: "Enter password",
        }
      }
    });

    //Validate sign-up form
    $('#signup-form').validate({ // initialize plugin
    ignore:":not(:visible)",
      rules: {
        "name": {
          required: true,
          minlength: 4
        },
        "email": {
          required: true,
          email: true,
          emailCheck: true
        },
        "email": {
          required: true,
          equalTo: "#new-user-email",
          email: true,
          emailCheck: true
        },
        "new-user-password": {
          required: true,
          minlength: 6,
          checkStrength: true
        }
      },
      messages: {
        'name': {
          required: "Please enter the User Name",
          minlength: "User Name should be at least 4 characters"
        },
        'email': {
          required: "Please enter an email",
          email: "Please enter valid email"
        },
        'emailC': {
          required: "Please enter the email again",
          equalTo: "Should be same as the email above",
          email: "Please enter valid email"
        },
        'new-user-password': {
          required: "Please enter a password",
          minlength: "Password should be minimum 6 characters",
        }
      }
    });
    // Password strength validation method
    jQuery.validator.addMethod("checkStrength", function(value, element) {
      return  passwordStrength();
    }, "Password should contain at least one uppercase character and one number");
    // Function to check password validation
    function passwordStrength() {
      var newUserPassword = $("#new-user-password").val();
      var endDate = $("#new-event-end-date").val();
      if (!newUserPassword.match(/\d/g) || !newUserPassword.match(/[A-Z]/g)) {
            return false;
        } else {
          return true;
        }
    }

    // email validation method
    jQuery.validator.addMethod("emailCheck", function(value, element) {
      var atpos = value.indexOf("@");
      var dotpos = value.lastIndexOf(".");
      return  (atpos>=1 && dotpos>=atpos+2 && dotpos+2<value.length);
    }, "Please enter valid email");


    // Event form validation
    var current = 1;
    var widget      = $(".step");
    var btnnext     = $(".next");
    var btnback     = $(".back");
    var btnsubmit   = $(".create");
      // Change progress bar action
    var setProgress = function(currstep){
      var widthPercent;
      var percent = parseFloat(100 / widget.length) * (currstep -1 );
      if (percent == 0) {
        widthPercent = 5;
      } else {
        widthPercent = percent;
      }
      percent = percent.toFixed();
      $(".progress-bar").css("width", widthPercent+"%").html(percent + "%");
    }
    // Hide buttons according to the current step
    var hideButtons = function(current){
      var limit = parseInt(widget.length);
      $(".action").hide();
      if(current < limit) btnnext.show();
      if(current > 1) btnback.show();
      if (current == limit) {
        // Show entered values
        $(".display label.lbl").each(function(){
          $(this).html($("#"+$(this).data("id")).val());
        });
        btnnext.hide();
        btnsubmit.show();
      }
    }
    // Init buttons and UI
    widget.not(':eq(0)').hide();
    hideButtons(current);
    setProgress(current);
    // Next button click action
    btnnext.click(function(){
      if(current < widget.length){

        // Check validation
        if($("#event-form").valid()){
          widget.show();
          widget.not(':eq('+(current++)+')').hide();
          setProgress(current);
        }
      }
      hideButtons(current);
    })
    // Back button click action
    btnback.click(function(){
      if(current > 1){
        current = current - 2;
        if(current < widget.length){
          widget.show();
          widget.not(':eq('+(current++)+')').hide();
          setProgress(current);
        }
      }
      hideButtons(current);
    })
    // Submit button click action
    btnsubmit.click(function(){
      current = 1;
      hideButtons(current);
      setProgress(current);
    })
    $('#event-form').validate({ // initialize plugin
    ignore:":not(:visible)",
      rules: {
        "new-event-name": {
          required: true,
          minlength: 4
        },
        'new-event-type': {
          required: true,
          minlength: 4
        },
        'new-event-host': {
          required: true,
          minlength: 2
        },
        'new-event-start-date': {
          required: true,
          date: true,
          checkStartDate: true
        },
        'new-event-start-time': {
          required: true,
          timeCheck: true,
          checkStartDateTime: true
        },
        'new-event-end-date': {
          required: true,
          date: true,
          checkDates: true
        },
        'new-event-end-time': {
          required: true,
          timeCheck: true,
          checkTimes: true
        },
        'new-event-location': "required",
        'new-event-guests': "required"
      },
      messages: {
        'new-event-name': {
          required: "Please enter an Event Name",
          minlength: "Event Name should be at least 4 characters"
        },
        'new-event-type': {
          required: "Please enter an Event Type",
          minlength: "Event Type should be at least 4 characters"
        },
        'new-event-host': {
          required: "Please enter the name of the host",
          minlength: "Event Type should be at least 2 characters"
        },
        'new-event-start-date': {
          required: "Please enter the date of an event",
          date: "Please enter a valid date"
        },
        'new-event-start-time': {
          required: "Please enter the start time of an event",
          time: "Please enter a valid time"
        },
        'new-event-end-date': {
          required: "Please enter the end date of an event",
          date: "Please enter a valid end date"
        },
        'new-event-end-time': {
          required: "Please enter the end time of an event",
          time: "Please enter a valid end time"
        },
        'new-event-location': "Please enter the location of the event",
        'new-event-guests': "Please enter the list of guests"
      }
    });
    $.validator.addMethod("timeCheck", function(value, element) {
      //console.log("in timecheck" + value);
      return this.optional(element) || /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/i.test(value);
    }, "Please enter a valid time.");
    /* change the select value to an integer to add to unix time of date from datepicker*/
    $.fn.parseValToNumber = function() {
      return parseInt($(this).val().replace(':',''), 10) || 0;
    }
    function compareDates() {
      var startDate = $("#new-event-start-date").val();
      var endDate = $("#new-event-end-date").val();
      if( !startDate || !endDate){
          return false;
      }
      if(endDate > startDate) {
          return true;
      } else if (endDate == startDate){
        var endTime = $('#new-event-end-time').parseValToNumber();
          var startTime = $('#new-event-start-time').parseValToNumber();
        return endTime > startTime;
      } else {
        return false;
      }
    }
    //Convert a date to object form
    function parseDate(s) {
      var b = s.split(/\D/);
      return new Date(b[0], --b[1], b[2]);
    }
    //Validate start date/time is in future
    function compareStartDateTime() {
      var startdatevalue = $("#new-event-start-date").val();
      var starttimevalue = $("#new-event-start-time").val();
      var currentdatetime = new Date();
      var currentdate = new Date();
      currentdate.setHours(0,0,0,0);
      // Return false if start date it in past
      //console.log(parseDate(startdatevalue) + "=" + currentdate);
      if (parseDate(startdatevalue) < currentdate) {
        //console.log("in if..");
        return false;
      } else if (parseDate(startdatevalue) > currentdate){
        //console.log("in else if..");
        return true;
      } else {
        //console.log("in else..");
        var startHour = parseInt(starttimevalue.substr(0,2));
        var startMin = parseInt(starttimevalue.substr(3,2));
        var currentHour = currentdatetime.getHours();
        var currentMin = currentdatetime.getMinutes();
        if (((startHour * 60) + startMin) < ((currentHour * 60) + currentMin)) {
          return false;
        } else {
          return true;
        }
      }
    }
    // End time validation method
    jQuery.validator.addMethod("checkTimes", function(value, element) {
      return  compareDates();
    }, "End time must be after start time");

    // End date validation method
    jQuery.validator.addMethod("checkDates", function(value, element) {
      var startdatevalue = $("#new-event-start-date").val();
      return Date.parse(startdatevalue) <= Date.parse(value);
    },"End date cannot be before start date");

    // Start date validation method
    jQuery.validator.addMethod("checkStartDate", function(value, element) {
      var startdatevalue = $("#new-event-start-date").val();
      var currentdate = new Date();
      currentdate.setHours(0,0,0,0);
      return (parseDate(startdatevalue) >= currentdate);
    },"Start date should be current/future");

    // Start date/time validation method
    jQuery.validator.addMethod("checkStartDateTime", function(value, element) {
      return compareStartDateTime();
    },"Start time should be in future");
  });
  //End of ready function
