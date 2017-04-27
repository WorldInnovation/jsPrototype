$('document').ready(function(){
    //create xmlHttp
    var xmlHttp = false;
    /*@cc_on @*/
    /*@if (@_jscript_version >= 5)
     try {
     xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
     } catch (e) {
     try {
     xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
     } catch (e2) {
     xmlHttp = false;
     }
     }
     @end @*/

    if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
        xmlHttp = new XMLHttpRequest();
    }
    function updatePage() {
        if (xmlHttp.readyState == 4) {
            var response = xmlHttp.responseText;
            document.getElementById("zipCode").value = response;

        }
    }
    var myget = "";
    $('#getDep').click(function(){
        $.ajax({
            url: '/depList',
            type:'GET',
            dataType: 'json',
            error: function(){
                $('#mainApp').append('<p>depList not call</p>');
            },


            success:function(data){
                    $('#mainApp').append('<p>hello world</p>');
                    alert("Success!");
                    $.each(departments, function(k, v) {
                        $.each(v, function(key, value) {
                            $('#mainApp').append('<br/>' + key + ' : ' + value);
                        })
                    })


            } // End of success function of ajax form
        }); // End of ajax call

    });

        $("#test").click(function(){
            $.get("/deps",function(data,status){
                $('#mainApp').append('<br/>' + data + ' : ' + status);
                //alert("Data: " + data + "\nStatus: " + status);
            });
        });
    $("#submit").on('click', function(){
        // send ajax
        $.ajax({
            url: '/ajaxtest',
            type : "POST",
            dataType : 'json',
            data : $("#depSave").serialize(), // post data || get data
            success : function(result) {
                // you can see the result from the console
                // tab of the developer tools
                console.log(result);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });

        var DepartmetList = (function () {
           $.get("")

        })
    /*$('body').append('<a href ="http://google.com">Jump to google< />');
    var markers = 1;*/
});

/*
$.ajax({

    type: "POST",
    url: "/url",
    data: markers,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){alert(data);},
    failure: function(errMsg) {
        alert(errMsg);
    }
    /!*$(function() {
     $("#myForm").submit(function() {
     var formData = {
     "field1":$("#field1").val()
     , "field2":$("#field2").val()
     };
     $.ajax({
     url:'dataparser.php'
     , type:'POST'
     , data:'jsonData=' + $.toJSON(formData)
     , success: function(res) {
     alert(res);
     }
     });
     return false;
     });
     });*!/
});*/
