$('document').ready(function(){

    //---------------
        $("#test").click(function(){
            $.get("/ajaxtest",function(data,status){
                $('#content').append('<br/>' + data + ' : ' + status);
            });
        });

        //---get departments
        $("#getDeps").click(function () {
            $.get("/deps",function (data,status) {//
                $('#content').append('<br/>' + 'Status: '+ status);
                $.each(data, function(k, v) {
                    $.each(v, function(key, value) {
                        if (key == 'id') $('#content').append('<br/>'  + value);
                            if(key == 'name') $('#content').append(' '  + value);
                    });
                });
            });
        });
    //---

    $("#butSaveDep").click( function(){
        $.ajax({
            url: '/depSave',
            type : "POST",
            dataType : 'json',
            data : $("#depSave").serialize(), // post data || get data
            success : function(data) {
                console.log(data);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });
    $("body").on("click", "#depTable td", function (e) {
        var depID = $(this).closest('tr').attr('id');// table row ID
        if($(this).attr('id')==="select") employeesList();
        if($(this).attr('id')==="edit") editDepartment(depID);
        if($(this).attr('id')==="delete") deleteDep(depID);
    });

    function arrayToTable(tableData) {
        var table = $('<table></table>');

        $(tableData).each(function (i, rowData) {
            var row = $('<tr></tr>');
            $(rowData).each(function (j, cellData) {
                row.append($('<td>'+cellData+'</td>'));
            });
            table.append(row);
        });
        return table;
    }

    var deleteDep = function (depID){
        $.ajax({
            url: '/deleteDep',
            type : "POST",
            dataType : 'json',
            data : { depID : depID },
            success : function(result) {
                alert("Delete id:" + result);
                console.log(result);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    }

    var editDepartment = function (depID){
        $.ajax({
            url: "/editDepartment",
            type : "GET",
            dataType : 'json',
            data : { depID : depID },
            success : function(data) {
                console.log(data);
                $('#name').val(data.name);
                $('#id').val(data.id);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    }


  $("#getDepTable").click( function () {
            departmetList();
        });

    var depTable = (function(data){
        //clear black
        $('#name').val('');
        $('#id').val('');
        $("table").empty();

        var table = $('<table id="depTable">' +'<caption>' + '<h2>' + 'Departments' + '</h2>' +'</caption>' + '</table>');
        var row = $('<tr></tr>');
        row.append('<th>' + " id " + '</th>');
        row.append('<th>' + " name " + '</th>');
        row.append('<th>' + "select" + '</th>');
        row.append('<th>' + "edit" + '</th>');
        row.append('<th>' + "delete" + '</th>');
        table.append(row);
        $.each(data, function (k, v) {

            $.each(v, function (key, value) {
                var idDep;
                if (key == 'id') {
                    row = $('<tr>').attr('id', value);
                    row.append('</tr>');
                    row.append('<td>' + value + '</td>' + '<input type="hidden" name="depID" value="${idDep}">');
                }
                if (key == 'name') {
                    row.append('<td>' + value + '</td>');
                    row.append('<td id="select">' + '<input id="selectDep" type="submit" value="select">' + '</td>' + '<input type="hidden" name="depID" value="${idDep}">');
                    row.append('<td id="edit">' + '<input id="editDep" type="submit" value="edit"  >' + '</td>' + '<input type="hidden" name="depID" value="${idDep}">');
                    row.append('<td id="delete">' + '<input type="submit" id="deleteDep" value="delete" >' + '</td>' + '<input type="hidden" name="depID" value="${idDep}">');
                }
            });
            table.append(row);
            
        } );
        $('#content').append(table);
    });

        var departmetList = (function () {
            $.ajax({
                type: "GET",
                url: "/deps",
                dataType: 'json',
                success: function (data) {
                    if(data){
                        depTable(data);
                    }
                }
            });

        });

});


