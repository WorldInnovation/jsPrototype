$('document').ready(function(){

        $("#test").click(function(){
            $.get("/ajaxtest",function(data,status){
                alert("Data: " + data + "\nStatus: " + status);
            });
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
