function EmpService() {

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
                }
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
                alert('Employee not save');
            }
        });

    };

    var deleteEmp = function (empID) {
        $.ajax({
            url: '/empDelete',
            type: "POST",
            dataType: 'json',
            data: {depID: depID,
                empID: empID },
            success: function (result) {
                alert("Delete id:" + result);
                console.log(result);
                employeeList(depID);
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    };

    var editEmp = function (empID) {
        $.ajax({
            url: '/employeeEdit',
            type: "GET",
            dataType: 'json',
            data: {depID: depID,
                empID: empID },
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

}