package com.aimprosoft.controller;

import com.aimprosoft.exeption.DaoExp;
import com.aimprosoft.exeption.ValidateExp;
import com.aimprosoft.model.Department;
import com.aimprosoft.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class DepartmentsController extends ExceptionHandlingController {
    @Autowired
    private DepartmentService departmentService;

    @RequestMapping(value = "/deps", method = RequestMethod.GET)
    @ResponseBody
    public List<Department> getUsers() throws DaoExp {
        List<Department>  departments = departmentService.getAll();
        return departments;
    }

    @RequestMapping(value = "/editDepartment", method = RequestMethod.GET)
    @ResponseBody
    public Department editDepartment(Long depID) throws DaoExp {
        Department department = null;
        if (depID != null) department = departmentService.getDepartmentById(depID);
        return department;
    }
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String printWelcome() {
        return "start";
    }

    @ResponseBody
    @RequestMapping(value = "/depSave", method = RequestMethod.POST)
    public Department depSave(Department department) throws DaoExp {
        try {
            departmentService.saveOrUpdateDepartment(department);
            return department;
        } catch (ValidateExp exp) {
            return null;
        }
    }
    @ResponseBody
    @RequestMapping(value = "/deleteDep", method = RequestMethod.POST)
    public String depDelete( Long depID) throws DaoExp {
        departmentService.getDepartmentById(depID);
        departmentService.deleteDepartment(depID);
        return depID.toString();
    }

}

