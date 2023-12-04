$(document).ready(function(){
    (function($) {
        "use strict";
		jQuery.validator.addMethod("lettersonly", function(value, element) {
		  return this.optional(element) || /^[a-zA-Z., ]+$/i.test(value);
		}, "Letters only please"); 
		$("#btn_contact").click(function(e) {
			$('#frm_contact').validate({
				rules: {
					contact_name: {
						lettersonly: true,
						required: true
					},
					contact_email: {
						required: true,
						email: true
					},
					contact_phone:{
						required: true,
						minlength: 10,
						maxlength:11,
						digits: true
					}
				},
				messages: {
					contact_name: {
						required: "Please enter your name"
					},
					contact_email: {
						required: "Please enter your email"
					},
					contact_phone: {
						required: "Please enter your contact number",
						minlength: "Please enter valid contact number",
						maxlength: "Please enter valid contact number",
						digits: "Please enter valid contact number"
					}
				},
				submitHandler: function(form) {
					$.ajax
					({
						type:'post',
						url:'includes/send.php',
						data: $(form).serialize(),
						success:function(response) 
						{
							//alert(response);
							var obj = JSON.parse(response);
							if(obj['success'])
							{
								var validator = $("#frm_contact").validate();
								validator.resetForm(); 
								swal({title:"Thank you!",text:"Your submission has been received.\nWe'll respond to your request shortly.",type:"success"});
							}
							else if(obj['error'])
							{
								var validator = $("#frm_contact").validate();
								validator.resetForm(); 
								swal({title:"Error!",text:obj['error_msg'],type:"error"});
							}
						},
						error:function(response) 
						{
							//alert(response);
							var validator = $("#frm_contact").validate();
							validator.resetForm(); 
							swal({title:"Error!",text:"Error Sending Request",type:"error"});
						}
					});
				}
			})
		});
		$("#btn_contactmodal").click(function(e) {
			$('#frm_contactmodal').validate({
				rules: {
					contact_name: {
						lettersonly: true,
						required: true
					},
					contact_email: {
						required: true,
						email: true
					},
					contact_phone:{
						required: true,
						minlength: 10,
						maxlength:11,
						digits: true
					}
				},
				messages: {
					contact_name: {
						required: "Please enter your name"
					},
					contact_email: {
						required: "Please enter your email"
					},
					contact_phone: {
						required: "Please enter your contact number",
						minlength: "Please enter valid contact number",
						maxlength: "Please enter valid contact number",
						digits: "Please enter valid contact number"
					}
				},
				submitHandler: function(form) {
					$.ajax
					({
						type:'post',
						url:'includes/send.php',
						data: $(form).serialize(),
						success:function(response) 
						{
							
							var obj = JSON.parse(response);
							if(obj['success'])
							{
								
								var validator = $("#frm_contactmodal").validate();
								validator.resetForm(); 
								swal({title:"Thank you!",text:"Your submission has been received.\nWe'll respond to your request shortly.",type:"success"});
								$('#with-form').modal('hide');
								//setTimeout(function() { window.location=window.location;},1000);


							}
							else if(obj['error'])
							{
								
								var validator = $("#frm_contactmodal").validate();
								validator.resetForm(); 
								swal({title:"Error!",text:obj['error_msg'],type:"error"});
								$('#with-form').modal('hide');
							}
						},
						error:function(response) 
						{
							var validator = $("#frm_contactmodal").validate();
							validator.resetForm(); 
							swal({title:"Error!",text:"Error Sending Request",type:"error"});
							$('#with-form').modal('hide');

						}
					});
				}
			})
		});
	})(jQuery)
});