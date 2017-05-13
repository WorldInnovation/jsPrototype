
function MainController(config) {
    var context = config.context;
    var lickToDep = config.dfg;
    var depID;

    var initApp = function () {
        console.log('start');
        router('depList');
    };

    var router = function (state) {
        if(state == 'depList'){
            var config = {
                contextDep: context
            };
            console.log('depList on');
            var depList = new DepartList(config, router);
            return depList;
        }

        if(state == 'depForm'){
            var config = {
                contextDep: context,
                lickToDep: lickToDep
            };
            var depList = new DepartList(config, router);
        }
    };

    return {
        init: initApp
    }
}

/*function DepartList(config, callBack) {
    var ss = config.ddd;
    var callbac = callBack;

    $('#buttonEm').on('click', true, function () {
        destroyDom();
        callbac('depEmpl');
    });

    var destroyDom = function () {

    }

}*/

function DepartList(config, callBack) {
    var ss = config.ddd;
    var callbac = callBack;


    $('#buttonEm').on('click', true, function () {
        destroyDom();
        callbac('depEmpl');
    });

            //clear black
            $('#name').val('');
            $('#id').val('');
            $("#content").empty();

            var rowForm = $('<form id="depSave" action="depSave" method="post">');
            var child = $('<input id="name" type="text" name="name" placeholder="Enter department" pattern="[A-Za-z]{3,}" value=""/><br>');
            child.append('<input id="id" type="hidden" name="id"  value=""/>');
            child.append('</form>');
            rowForm.append(child);
            rowForm.append('<input id="butSaveDep" type="submit" value="OK">');
            $('#content').append(rowForm);


            var table = $('<table id="depTable">' + '<caption>' + '<h2>' + 'Departments' + '</h2>' + '</caption>' + '</table>');
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
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'name') {
                        row.append('<td>' + value + '</td>');
                        row.append('<td id="select">' + 'select' + '</td>');
                        row.append('<td id="edit">' + 'edit' + '</td>');
                        row.append('<td id="delete">' + 'delete' + '</td>');
                    }
                });
                table.append(row);

            });
            $('#content').append(table);

}



