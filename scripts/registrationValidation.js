var path = window.location.pathname;
var page = path.substring(path.lastIndexOf('/') + 1);

if(page == 'registrationPage.php'){
    $(document).ready(function(){
        var checks = [false, false, false, false, false, false, false];

        function checkFields(){
            if($.inArray(false, checks) == -1){
                $('#Continue_Button').attr('disabled', false);
            }
            else{
                $('#Continue_Button').attr('disabled', true);
            }
        }

        $('#Email').keyup(function(){
            var input = $(this).val();
            var pattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
            var valid = pattern.test(input);
            if(valid){
                $('#Email_Group > #Error_Regex').addClass('hide');
                $.ajax({
                    type: "post",
                    url: "scripts/checkIfEmailIsRegistered.php",
                    data: input,
                    dataType: "text",
                    success:function(response){
                        var result = parseInt(response);
                        if(result){
                            $('#Email_Group > #Error_Unique').removeClass('hide');
                            checks[0] = false;
                            checks[1] = false;
                            checkFields();
                        }
                        else{
                            $('#Email_Group > #Error_Unique').addClass('hide');
                            checks[0] = true;
                            var confirmEmail = $('#Confirm_Email').val();
                            if(confirmEmail.length > 5){
                                if(input != confirmEmail){
                                    $('#Confirm_Email_Group > #Error_Regex').removeClass('hide');
                                    checks[1] = false;
                                }
                                else{
                                    $('#Confirm_Email_Group > #Error_Regex').addClass('hide');
                                    checks[1] = true;
                                }
                            }
                            checkFields();
                        }
                    }
                });
            }
            else{
                $('#Email_Group > #Error_Unique').addClass('hide');
                $('#Email_Group > #Error_Regex').removeClass('hide');
                checks[0] = false;
                checks[1] = false;
                checkFields();
            }
        });

        $('#Confirm_Email_Group').find('#Confirm_Email').keyup(function(){
            if(checks[0]) {
                var input = $(this).val();
                if(input != $('#Email').val()){
                    $('#Confirm_Email_Group > #Error_Regex').removeClass('hide');
                    checks[1] = false;
                    checkFields();
                }
                else{
                    $('#Confirm_Email_Group > #Error_Regex').addClass('hide');
                    checks[1] = true;
                    checkFields();
                }
            }
        });

        $('#Username_Group').find('#Username').keyup(function(){
            var input = $(this).val();
            var pattern = /^[a-zA-Z0-9_-]{3,32}$/;
            var valid = pattern.test(input);
            if(valid){
                $('#Username_Group > #Error_Regex').addClass('hide');
                $.ajax({
                    type: "post",
                    url: "scripts/checkUsernameAvailability.php",
                    data: input,
                    dataType: "text",
                    success:function(response){
                        var result = parseInt(response);
                        if(result){
                            $('#Username_Group > #Error_Regex').addClass('hide');
                            $('#Username_Group > #Error_Unique').removeClass('hide');
                            checks[2] = false;
                            checkFields();
                        }
                        else{
                            $('#Username_Group > #Error_Unique').addClass('hide');
                            checks[2] = true;
                            checkFields();
                        }
                    }
                });
            }
            else{
                $('#Username_Group > #Error_Unique').addClass('hide');
                $('#Username_Group > #Error_Regex').removeClass('hide');
                checks[2] = false;
                checkFields();
            }

        });

        $('#First_Name_Group').find('#First_Name').blur('input', function(){
            var input = $(this).val();
            var pattern = /^[a-zA-Z]{2,32}$/;
            var valid = pattern.test(input);
            if(valid){
                $('#First_Name_Group > #Error_Regex').addClass('hide');
                checks[3] = true;
                checkFields();
            }
            else{
                $('#First_Name_Group > #Error_Regex').removeClass('hide');
                checks[3] = false;
                checkFields();
            }
        });

        $('#Last_Name_Group').find('#Last_Name').blur('input', function(){
            var input = $(this).val();
            var pattern = /^[a-zA-Z'-]{2,32}$/;
            var valid = pattern.test(input);
            if(valid){
                $('#Last_Name_Group > #Error_Regex').addClass('hide');
                checks[4] = true;
                checkFields();
            }
            else{
                $('#Last_Name_Group > #Error_Regex').removeClass('hide');
                checks[4] = false;
                checkFields();
            }
        });

        $('#Password_Group').find('#Password').keyup(function(){
            var input = $(this).val();
            var pattern = /^[a-zA-Z0-9_-]{6,32}$/;
            var valid = pattern.test(input);
            if(valid){
                $('#Password_Group > #Error_Regex').addClass('hide');
                checks[5] = true;
                var confirmPassword = $('#Confirm_Password').val();
                if(confirmPassword.length > 5){
                    if(input != confirmPassword){
                        $('#Confirm_Password_Group > #Error_Regex').removeClass('hide');
                        checks[6] = false;
                    }
                    else{
                        $('#Confirm_Password_Group > #Error_Regex').addClass('hide');
                        checks[6] = true;
                    }
                }
                checkFields();
            }
            else{
                $('#Password_Group > #Error_Regex').removeClass('hide');
                checks[5] = false;
                checkFields();
            }
        });

        $('#Confirm_Password_Group').find('#Confirm_Password').keyup(function(){
            if(checks[5]){
                var input = $(this).val();
                if(input != $('#Password').val()){
                    $('#Confirm_Password_Group > #Error_Regex').removeClass('hide');
                    checks[6] = false;
                    checkFields();
                }
                else{
                    $('#Confirm_Password_Group > #Error_Regex').addClass('hide');
                    checks[6] = true;
                    checkFields();
                }
            }
        });
    });

}