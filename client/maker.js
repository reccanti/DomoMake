"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
    }
    
    function sendAjax(action, data) {
        console.log(action);
        console.log(data);
        
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#domoMessage").animate({width:'hide'},350);
                console.log("HellO");
                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
                console.log("goodbye");
                handleError(messageObj.error);
            }
        });
    }
    
    $("#makeDomoSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#domoMessage").animate({width:'hide'},350);
    
        if($("#domoName").val() == '' || $("#domoAge").val() == '') {
            handleError("RAWR! All fields are required");
            return false;
        }

        sendAjax($("#domoForm").attr("action"), $("#domoForm").serialize());
        
        return false;
    });
    
    $(".domoEditSubmit").on("click", function(e) {
        e.preventDefault();
        var form = e.target.parentElement;
        sendAjax(
            $(form).attr("action"),
            $(form).serialize()
        );
        console.log(e.target.parentElement);
    });
    
    // $(".domoEditForm").on("submit", function(e) {
    //    $("#domoMessage").animate({width:'hide'},350);
    //    sendAjax(
    //        $(e.target).attr("action"), 
    //        $(e.target).serialize()); 
    //    //e.preventDefault();
    //    return false;
    // });
    
});