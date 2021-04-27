import { checkValidity } from "./inputValidation.js";


// ------------------------------ ADD CATEGORY ----------------------------------------------

$(document).ready(function () {
    $("#btn-add-category").click(function (e) {

        let name = $('#name').val();

        let values = {
            name: {}
        }

        values['name'].val = name;
        values['name'].valueName = 'Category Name';
        values['name'].max = 30;
        values['name'].min = 3;
        values['name'].pattern = {customPattern: '^[a-zA-Z0-9 ]+$', customMessage: ''};

        let validation = checkValidity(values)

        let haveError = Object.values(validation).some(error => error.name !== '');

        if (!haveError) {
            let formData = { name };
            $.ajax({
                url: 'http://localhost:8000/api/v1/categories',
                method: 'POST',
                data: formData,
                success: function (data) {
                    $('form :input').val('');
                    $('.error-input').text('');
                    validation = '';
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Added A New Category',
                        showConfirmButton: false,
                        timer: 2500
                    });
                },                
                error: function (xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: xhr.responseJSON.message,                       
                      });
                }
            });
        } else {
            $('.error-input').text(validation.errors['name']);
        }

        setTimeout(function () {
            $('.error-input').text('');
        }, 10000)

    });


// ------------------------------------- ADD MOVIE -------------------------------------------

    $("#btn-add-movie").click(function (e) {
        let title = $('#title').val();
        let releaseYear = $('#releaseYear').val();
        let cast = $('#cast').val();
        let storyLine = $('#storyLine').val();
        let category = $('#category').val();
        let picture = $('#picture').prop('files')[0];

        let values = {
            'title': {
                val: title,
                valueName: 'Title',
                max: 30,
                min: 3,
                pattern:  {customPattern: '^[a-zA-Z0-9\\s.,\'-]*$', customMessage: ''}
            },
            'releaseYear': {
                val: releaseYear === '' || typeof (releaseYear) === 'undefined' ? '' : parseInt(releaseYear, 10),
                valueName: 'Release Year',
                max: 2030,
                min: 1910,
                pattern:  {customPattern: '^[0-9]+$', customMessage: ''}
            },
            'cast': {
                val: cast,
                valueName: 'Major Cast',
                max: 500,
                min: 5,
                pattern:  {customPattern: '^[a-zA-Z0-9\\s.,\'-]*$', customMessage: ''}
            },
            'storyLine': {
                val: storyLine,
                valueName: 'Story Line',
                max: 1000,
                min: 3,
                pattern:  {customPattern: '^[a-zA-Z0-9\\s.,!:\'-]*$', customMessage: ''}
            },
            'category': {
                val: category,
                valueName: 'Category',
                max: 30,
                min: 3,
                pattern:  {customPattern: '^[a-zA-Z0-9\\s.,\'-]*$', customMessage: ''}
            },
            'picture': {
                val: picture,
                valueName: 'Picture',
            },
        }


        let validation = checkValidity(values)
        

        let haveError = Object.keys(validation.errors).some(key => validation.errors[key] !== '');

        if (!haveError) {
            let formData = new FormData();
            formData.append('title', title);
            formData.append('releaseYear', parseInt(releaseYear, 10));
            formData.append('cast', cast);
            formData.append('storyLine', storyLine);
            formData.append('picture', picture);
            formData.append('category', category);

            $.ajax({
                url: 'http://localhost:8000/api/v1/movies',
                enctype: 'multipart/form-data',
                method: 'POST',
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function () {
                    $('form').loading({
                        message:'Saving data. Please wait...'
                    });
                    $('#btn-add-movie').attr("disabled", true);

                },
                success: function (data) {
                    $('form :input').val('');

                    $('form').loading('stop');
                    $('#btn-add-movie').attr("disabled", false);

                    Object.keys(validation.errors).forEach(key => {
                        let errorInput = $(`.${key}.error-input`);
                        errorInput.text('');
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Added A New Movie',
                        showConfirmButton: false,
                        timer: 2000
                    })
                },
                error: function (xhr, status, error) {
                    $('form').loading('stop');
                    $('#btn-add-movie').attr("disabled", false);

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: xhr.responseJSON.message,                       
                      });
                }
            });
        } else {

            Object.keys(validation.errors).forEach(key => {
                let errorInput = $(`.${key}.error-input`);
                console.log(key);
                console.log(validation.errors[key])
                errorInput.text(validation.errors[key]);
            })
        }

        setTimeout(function () {
            Object.keys(validation.errors).forEach(key => {
                let errorInput = $(`.${key}.error-input`);
                errorInput.text('');
            });
        }, 10000)
    });


// ------------------------------------- SIGN UP -------------------------------------------

    $('#btn-signup').click(e => {
        e.preventDefault();

        let btnSignUp = $(this);

        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let dob = $('#dob').val();
        let password = $('#password').val();
        let confirmPassword = $('#confirmPassword').val();
        let email = $('#email').val();        

        let values = {
            firstName: {
                val: firstName,
                valueName: 'First Name',
                max: 30,
                min: 3,
                pattern:  {customPattern: '^[a-zA-Z ]*$', customMessage: ''}
            },
            lastName: {
                val: lastName,
                valueName: 'Last Name',
                max: 30,
                min: 3,
                pattern:   {customPattern: '^[a-zA-Z ]*$', customMessage: ''}
            },
            password: {
                val: password,
                valueName: 'Password',
                max: 50,
                min: 8,
                pattern:   {customPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$'
                , customMessage: 'Password must have at least one number. Uppercase and special characters are optional'}
            },
            confirmPassword: {
                val: confirmPassword,
                valueName: 'Confirm Password',
                max: 50,
                min: 8,
                pattern:  {customPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$'
                , customMessage: 'Confirm Password must have at least one number. Uppercase and special characters are optional'}
            },
            email: {
                val: email,
                valueName: 'Email',
                max: 50,
                min: 4,
                pattern: {customPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                customMessage: ''}
            },

        }
        
        let validation = checkValidity(values)        
        let haveError = Object.keys(validation.errors).some(key => validation.errors[key] !== '');

        if (!haveError) {

            $.ajax({
                url: 'http://localhost:8000/api/v1/users/signup',
                method: 'POST',
                data: { firstName, lastName, dob, password, confirmPassword, email },
                beforeSend: function () {
                    $('form').loading({
                        message:'Saving data. Please wait...'
                    });
                    $('#btn-signup').attr("disabled", true);

                },
                success: function (data) {                    
                    $('form :input').val('');
                    $('.error-input').text('');
                    $('form').loading('stop');
                    $('#btn-signup').attr("disabled", false);

                    Object.keys(validation.errors).forEach(key => {
                        let errorInput = $(`.${key}.error-input`);
                        errorInput.text('');
                    });
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Signed Up',
                        showConfirmButton: false,
                        timer: 2500
                    })
                },
                error: function (xhr, status, error) {
                    $('form').loading('stop');
                    $('#btn-signup').attr("disabled", false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: xhr.responseJSON.message,                       
                      });
                      
                }
            });

        } else {
            Object.keys(validation.errors).forEach(key => {
                let errorInput = $(`.${key}.error-input`);
                errorInput.text(validation.errors[key]);
            });

            setTimeout(function () {
                Object.keys(validation.errors).forEach(key => {
                    let errorInput = $(`.${key}.error-input`);
                    errorInput.text('');
                });
            }, 7000)
        }

    });


// ------------------------------------- LOGIN  -------------------------------------------

    $('#btn-login').click(e => {
        e.preventDefault();

        let email = $('#email').val();
        let password = $('#password').val();        

        let values = {
            password: {
                val: password,
                valueName: 'Password',
                max: 50,
                min: 8,
                pattern: {customPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$'
                , customMessage: 'Password must have at least one number. Uppercase and special characters are optional'}
            },
            email: {
                val: email,
                valueName: 'Email',
                max: 50,
                min: 4,
                pattern: {customPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                customMessage: ''}
            },
        }


        let validation = checkValidity(values)

        let haveError = Object.keys(validation.errors).some(key => validation.errors[key] !== '');

        if (!haveError) {

            $.ajax({
                url: 'http://localhost:8000/api/v1/users/login',
                method: 'POST',
                data: { password, email },
                success: function (data) {
                    
                    $('form :input').val('');
                    Object.keys(validation.errors).forEach(key => {
                        let errorInput = $(`.${key}.error-input`);
                        errorInput.text('');
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Logged In',
                        showConfirmButton: false,
                        timer: 2500
                    })
                },
                error: function (xhr, status, error) {              
                          
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: xhr.responseJSON.message,                       
                      });
                }
            });

        } else {
            Object.keys(validation.errors).forEach(key => {
                let errorInput = $(`.${key}.error-input`);
                errorInput.text(validation.errors[key]);
            });

            setTimeout(function () {
                Object.keys(validation.errors).forEach(key => {
                    let errorInput = $(`.${key}.error-input`);
                    errorInput.text('');
                });
            }, 7000)
        }




    });


    // ----------------------- VERIFY ACCOUNT --------------------------------------------------------------------

    $('#btn-verify-account').click(e => {
        e.preventDefault();


        let email = $('#email').val();

        let values = {
            email: {
                val: email,
                valueName: 'Email',
                max: 50,
                min: 4,                
                pattern: {customPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                customMessage: ''}
            },
        }


        let validation = checkValidity(values)
        let haveError = Object.keys(validation.errors).some(key => validation.errors[key] !== '');
 
        if (!haveError) {
            $.ajax({
                url: 'http://localhost:8000/api/v1/users/sendVerificationEmail',
                method: 'POST',
                data: { email },
                beforeSend: function () {
                    $('form').loading({
                        message:'Sending verification link to your email. Please wait...'
                    });
                    $('#btn-verify-account').attr("disabled", true);

                },
                success: function (data) {
                    
                    $('form').loading('stop');
                    $('#btn-verify-account').attr("disabled", false);
                    $('form :input').val('');

                    Object.keys(validation.errors).forEach(key => {
                        let errorInput = $(`.${key}.error-input`);
                        errorInput.text('');
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully sent the verification link to your email',
                        showConfirmButton: false,
                        timer: 2500
                    })
                },
                error: function (xhr, status, error) {
                    $('form').loading('stop');
                    $('#btn-verify-account').attr("disabled", false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: xhr.responseJSON.message,                       
                      });
                }
            });

        } else {
            Object.keys(validation.errors).forEach(key => {
                let errorInput = $(`.${key}.error-input`);
                errorInput.text(validation.errors[key]);
            });

            setTimeout(function () {
                Object.keys(validation.errors).forEach(key => {
                    let errorInput = $(`.${key}.error-input`);
                    errorInput.text('');
                });
            }, 7000)
        }
    });

    // ----------------------- FORGOT PASSWORD --------------------------------------------------------------------

    $('#btn-forgot-password').click(e => {
        e.preventDefault();

        let email = $('#email').val();

        let values = {
            email: {
                val: email,
                valueName: 'Email',
                max: 50,
                min: 4,
                pattern: {customPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                customMessage: ''}
            },
        }


        let validation = checkValidity(values)
        let haveError = Object.keys(validation.errors).some(key => validation.errors[key] !== '');
      
        if (!haveError) {

            $.ajax({
                url: 'http://localhost:8000/api/v1/users/forgotPassword',
                method: 'POST',
                data: {email },
                beforeSend: function () {
                    $('form').loading({
                        message:'Sending password reset link to your email. Please wait...'
                    });
                    $('#btn-forgot-password').attr("disabled", true);
                },
                success: function (data) {
                    
                    $('form :input').val('');
                    $('form').loading('stop');
                    $('#btn-forgot-password').attr("disabled", false);

                    Object.keys(validation.errors).forEach(key => {
                        let errorInput = $(`.${key}.error-input`);
                        errorInput.text('');
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully sent the reset password link to your email.',
                        showConfirmButton: false,
                        timer: 2500
                    })
                },
                error: function (xhr, status, error) {
                    $('form').loading('stop');
                    $('#btn-forgot-password').attr("disabled", false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: xhr.responseJSON.message,                       
                      });
                }
            });

        } else {
            Object.keys(validation.errors).forEach(key => {
                let errorInput = $(`.${key}.error-input`);
                errorInput.text(validation.errors[key]);
            });

            setTimeout(function () {
                Object.keys(validation.errors).forEach(key => {
                    let errorInput = $(`.${key}.error-input`);
                    errorInput.text('');
                });
            }, 7000)
        }
    });


    // ----------------------RESET PASSWORD ------------------------------------------

    $('#btn-reset-password').click(e => {
        e.preventDefault();

        let password = $('#password').val();
        let confirmPassword = $('#confirmPassword').val();

        let values = {
            password: {
                val: password,
                valueName: 'Password',
                max: 50,
                min: 8,
                pattern: {customPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$'
                , customMessage: 'Password must have at least one number. Uppercase and special characters are optional'}
            },
            confirmPassword: {
                val: confirmPassword,
                valueName: 'Confirm Password',
                max: 50,
                min: 8,
                pattern: {customPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$'
                , customMessage: 'Confirm Password must have at least one number. Uppercase and special characters are optional'}
            },
        }

        let validation = checkValidity(values)
        let haveError = Object.keys(validation.errors).some(key => validation.errors[key] !== '');
        

        if (!haveError) {
            const passwordToken = location.pathname.split('/')[3];
            $.ajax({
                url: `http://localhost:8000/api/v1/users/resetPassword/${passwordToken}`,
                method: 'PATCH',
                data: {password, confirmPassword},                
                beforeSend: function () {
                    $('form').loading({
                        message:'Updating your password. Please wait...'
                    });
                    $('#btn-reset-password').attr("disabled", true);
                },
                success: function (data) {

                    $('form').loading('stop');
                    $('#btn-reset-password').attr("disabled", false);
                    
                    $('form :input').val('');
                    Object.keys(validation.errors).forEach(key => {
                        let errorInput = $(`.${key}.error-input`);
                        errorInput.text('');
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'You successfully updated your password',
                        showConfirmButton: false,
                        timer: 2500
                    });                    
                },
                error: function (xhr, status, error) {
                    $('form').loading('stop');
                    $('#btn-reset-password').attr("disabled", false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: xhr.responseJSON.message,                       
                      });
                }
            });

        } else {
            Object.keys(validation.errors).forEach(key => {
                let errorInput = $(`.${key}.error-input`);
                errorInput.text(validation.errors[key]);
            });

            setTimeout(function () {
                Object.keys(validation.errors).forEach(key => {
                    let errorInput = $(`.${key}.error-input`);
                    errorInput.text('');
                });
            }, 7000)
        }
    });

    // ------------------------------ Add Comment----------------------------------------------

    $('#btn-add-comment').click(e => {
        e.preventDefault();

        let email = $('#comment').val();

        let values = {
            email: {
                val: email,
                valueName: 'Email',
                max: 50,
                min: 4,
                pattern: {customPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                customMessage: ''}
            },
        }


        let validation = checkValidity(values)
        let haveError = Object.keys(validation.errors).some(key => validation.errors[key] !== '');
      
        if (true) {
            const movieId = location.pathname.split('/')[3];

            $.ajax({
                url: `http://localhost:8000/api/v1/movies/${movieId}/comments`,
                method: 'POST',
                data: {email },
                beforeSend: function () {
                    $('form').loading({
                        message:'Sending password reset link to your email. Please wait...'
                    });
                    $('#btn-forgot-password').attr("disabled", true);
                },
                success: function (data) {
                    
                    $('form :input').val('');
                    $('form').loading('stop');
                    $('#btn-forgot-password').attr("disabled", false);

                    Object.keys(validation.errors).forEach(key => {
                        let errorInput = $(`.${key}.error-input`);
                        errorInput.text('');
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully sent the reset password link to your email.',
                        showConfirmButton: false,
                        timer: 2500
                    })
                },
                error: function (xhr, status, error) {
                    $('form').loading('stop');
                    $('#btn-forgot-password').attr("disabled", false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: xhr.responseJSON.message,                       
                      });
                }
            });

        } else {
            Object.keys(validation.errors).forEach(key => {
                let errorInput = $(`.${key}.error-input`);
                errorInput.text(validation.errors[key]);
            });

            setTimeout(function () {
                Object.keys(validation.errors).forEach(key => {
                    let errorInput = $(`.${key}.error-input`);
                    errorInput.text('');
                });
            }, 7000)
        }
    });

});
