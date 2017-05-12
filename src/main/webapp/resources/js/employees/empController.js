function EmpController() {

    constructor = function () {
        empView.prototype =  EmpView.create();
        empService.prototype = EmpService.create();
    };

    showAllEmployees = function () {
        this.empService.getAll()
            .then(function (response) {
                this.empView.displayEmployees(response);
            });
    };

    empDelete = function (event) {
        var id = event.target.id;
        this.empService.empDelete(id)
            .then(function (response) {
                this.empView.displayEmployees(response);
            });
    };

    employeeEdit = function (event) {
        var id = event.target.id;
        var name = event.target.name;
        this.empService.employeeEdit(id, name)
            .then(function (response) {
                this.empView.displayEmpForm(response);
            });
    } ;

    empSave = function (event) {
        var id = event.target.id;
        var name = event.target.name;
        this.departmentService.save(id, name)
            .then(function (response) {
                this.empView.displayEmployees(response);
            });
    };
}