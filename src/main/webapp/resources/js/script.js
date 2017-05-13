$('document').ready(function () {

        var depID;
        var empID;
        var departmetList = (function () {
            $.ajax({
                type: "GET",
                url: "/deps",
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        depTable(data);
                    }
                }
            });
        });

        var deleteDep = function (depID) {
            $.ajax({
                url: '/deleteDep',
                type: "POST",
                dataType: 'json',
                data: {depID: depID},
                success: function (result) {
                    alert("Delete id:" + result);
                    console.log(result);
                    departmetList();
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }

        var editDepartment = function (depID) {
            $.ajax({
                url: "/editDepartment",
                type: "GET",
                dataType: 'json',
                data: {depID: depID},
                success: function (data) {
                    console.log(data);
                    $('#name').val(data.name);
                    $('#id').val(data.id);
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }

        var depTable = (function (data) {
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
        });

        //table click event
        $("body").on("click", "#depTable td", function () {
            depID = $(this).closest('tr').attr('id');// table row ID
            window.depID = $(this).depID;
            if ($(this).attr('id') === "select") employeeList(depID);
            if ($(this).attr('id') === "edit") editDepartment(depID);
            if ($(this).attr('id') === "delete") deleteDep(depID);
        });

        $("body").on("submit", "#depSave", function () {
            $.ajax({
                url: '/depSave',
                type: "POST",
                dataType: 'json',
                data: $("#depSave").serialize(), // post data || get data
                success: function (data) {
                    console.log(data);
                    departmetList();
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            })
            return false;
        });
//here show
        if (!$('#depTable').is()) {
            departmetList();
        }

        //------------- employees here functions-----------------------------------------
        var showEmpForm = function (depID) {
            $("#content").empty();
            empFormView(depID);
            $('#empSaveForm').attr('depID', depID);//set id in form
        }

        var employeeList = function (depID) {
            $.ajax({
                url: "/employeesList",
                type: "GET",
                dataType: 'json',
                data: {depID: depID},
                success: function (data) {
                    showEmpForm(depID);
                    if (data) {

                        // window.depID = $(this).depID;
                        empTable(data);
                    } else {
                        alert('Employees list is empty')
                    }
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }

            });
        };

        var empTable = (function (data) {
            var table = $('<table id="empTable">' + '<caption>' + '<h2>' + 'Employees' + '</h2>' + '</caption>' + '</table>');
            var row = $('<tr></tr>');

            row.append('<th>' + " id " + '</th>');
            row.append('<th>' + " firstName " + '</th>');
            row.append('<th>' + " secondName " + '</th>');
            row.append('<th>' + " grade " + '</th>');
            row.append('<th>' + " birthday " + '</th>');
            row.append('<th>' + " eMail " + '</th>');

            row.append('<th>' + "edit" + '</th>');
            row.append('<th>' + "delete" + '</th>');
            table.append(row);
            $.each(data, function (k, v) {
                $.each(v, function (key, value) {
                    if (key == 'id') {
                        row = $('<tr>').attr('id', value);
                        row.append('</tr>');
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'firstName') {
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'secondName') {
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'grade') {
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'birthday') {
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'eMail') {
                        row.append('<td>' + value + '</td>');
                        row.append('<td id="edit">' + 'edit' + '</td>');
                        row.append('<td id="delete">' + 'delete' + '</td>');
                    }
                });
                table.append(row);

            });
            $('#content').append(table);
        });

        var empFormView = function (depID) {
            var firstParent = $('<form id="empSaveForm" method="post" action="empSave"></form>');
            var row = $('<fildset></fildset>');
            row.append(' <legend>Employees form </legend>');
            row.append('<p> <label for="firstName">FirstName </label>' +
                '<input id="firstName" name="firstName" type="text"> ' +
                '</p>');
            row.append('<p> <label for="secondName">LastName </label>' +
                '<input id="secondName" name="secondName" type="text"> ' +
                '</p>');
            row.append('<p> <label for="grade">Gade   </label>' +
                '<input id="grade" name="grade" type="number"> ' +
                '</p>');
            row.append('<p> <label for="birthday">Birthday </label>' +
                '<input id="birthday" name="birthday" type="date"> ' +
                '</p>');
            row.append('<p> <label for="eMail">eMail </label>' +
                '<input id="eMail" name="eMail" type="email"> ' +
                '</p>');
            row.append('<p> <input id="submit" class="submit" type="submit" value="Submit">' +
                '</p>');
            row.append('<input id="id" type="hidden" name="id" value=""/>' +
                '<input id="depID" type="hidden" name="depID" value=""/>');


            firstParent.append(row);

            $('#content').append(firstParent);

            $('#depID').val(depID);

        }
        var saveEmployee = function () {
            $.ajax({
                url: '/empSave',
                type: 'post',
                dataType: 'json',
                data: $('#empSaveForm').serialize(),
                success: function (data) {
                    console.log(data);
                    if (data) {
                        alert('Employee save');
                        employeeList(depID);
                    } else {
                        alert('Employees list is empty');
                    }
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                    alert('Employee not save');
                }
            });

        }

        var deleteEmp = function (empID) {
            $.ajax({
                url: '/empDelete',
                type: "POST",
                dataType: 'json',
                data: {
                    depID: depID,
                    empID: empID
                },
                success: function (result) {
                    alert("Delete id:" + result);
                    console.log(result);
                    employeeList(depID);
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }

        var editEmp = function (empID) {
            $.ajax({
                url: '/employeeEdit',
                type: "GET",
                dataType: 'json',
                data: {
                    depID: depID,
                    empID: empID
                },
                success: function (data) {
                    alert("Edit id:" + data.id);
                    $('#id').val(data.id);
                    $('#firstName').val(data.firstName);
                    $('#secondName').val(data.secondName);
                    $('#grade').val(data.grade);
                    $('#birthday').val(data.birthday);
                    $('#eMail').val(data.eMail);
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }

        $("body").on("submit", "#empSaveForm", function () {
            saveEmployee();
            //employeeList(depID);
            return false;
        });

        //table click event
        $("body").on("click", "#empTable td", function () {
            empID = $(this).closest('tr').attr('id');// table row ID
            /*        if ($(this).attr('id') === "select") employeeList(depID);
             */
            if ($(this).attr('id') === "edit") {
                editEmp(empID);
            }
            if ($(this).attr('id') === "delete") {
                deleteEmp(empID);

            }
        });

    });
