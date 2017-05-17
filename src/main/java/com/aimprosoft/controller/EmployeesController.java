package com.aimprosoft.controller;


import com.aimprosoft.exeption.DaoExp;
import com.aimprosoft.exeption.ValidateExp;
import com.aimprosoft.model.Department;
import com.aimprosoft.model.Employee;
import com.aimprosoft.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.List;

@Controller
public class EmployeesController extends ExceptionHandlingController {
    @Autowired
    private EmployeeService employeeService;

    @InitBinder()
    public void dataBinding(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(java.util.Date.class, new CustomDateEditor(dateFormat, true));
    }

    @RequestMapping(value = "/employeesList", method = RequestMethod.GET)
    @ResponseBody
    public List<Employee> editDepartment(Long depID) throws DaoExp {
        Department department = null;
        List<Employee> employees = employeeService.listEmployee(depID);
        return employees;
    }

    @RequestMapping(value = "/employeeEdit", method = RequestMethod.GET)
    @ResponseBody
    public Employee employeeEdit( Long depID, Long empID) throws DaoExp {
        Employee employee = null;
        if (null != empID) {
             employee = employeeService.getEmpByID(empID);
        }
        return employee;
    }

    @RequestMapping(value = "/empDelete", method = RequestMethod.POST)
    @ResponseBody
    public Employee empDelete(Long depID, Long empID) throws DaoExp {
        Employee employee = null;
        if (null != empID) {
             employee = employeeService.getEmpByID(empID);
            employeeService.deleteEmployee(employee);
        }
        return employee;
    }

    @RequestMapping(value = "/empSave", method = RequestMethod.POST)
    @ResponseBody
    public Employee empSave(Long depID, Employee employee) throws DaoExp {
        try {
            employeeService.updateEmployee(employee, depID);
            return employee;
        } catch (ValidateExp exp) {
                      return null;
        }

    }

}