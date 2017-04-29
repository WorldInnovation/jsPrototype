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

/*    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String getUsers(@RequestBody  Model model) throws DaoExp {
        List<Department> departments;
        departments = departmentService.getAll();
        model.addAttribute("departments", departments);
        return "start";
    }*/
/*@RequestMapping(value = "/depList", method = RequestMethod.GET)
public String depList(){

}*/

    @RequestMapping(value = "/deps", method = RequestMethod.GET)
    @ResponseBody
    public List<Department> getUsers() throws DaoExp {

        List<Department>  departments = departmentService.getAll();

        return departments;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String printWelcome() {
        return "start";
    }

    @ResponseBody
    @RequestMapping(value = "/depSave", method = RequestMethod.POST)
    public Department depSave(Department department, Model model) throws DaoExp {
        try {
            departmentService.saveOrUpdateDepartment(department);
            model.addAttribute("department", department);
            return department;
        } catch (ValidateExp exp) {
            model.addAttribute("errorMap", exp.getErrorMap());
            return null;
        }
    }
    @ResponseBody
    @RequestMapping(value = "/deleteDep", method = RequestMethod.POST)
    public String depDelete( Long depId) throws DaoExp {
        Department department = departmentService.getDepartmentById(depId);
        departmentService.deleteDepartment(depId);
        return "depId";
    }
    @RequestMapping(value = "/ajaxtest", method = RequestMethod.GET)
    @ResponseBody
    public String ajaxTest() throws DaoExp {
 /*       List<Department> departments=  departmentService.getAll();
        return departments;*/
        String departments = "test responce";
        // List<Department> departments=  departmentService.getAll();
        return departments;
    }

/*    @RequestMapping(value = "/depList", method = RequestMethod.GET)
    @ResponseBody
    public String ajaxTest() throws DaoExp {
        String departments = "test responce";
        // List<Department> departments=  departmentService.getAll();
        return departments;
    }*/
/*    @RequestMapping(value = "/editDepartment", method = RequestMethod.GET)
    public String editDepartment(@RequestParam(required = false) Long depID, Model model) throws DaoExp {
        Department department = null;
        if (depID != null) department = departmentService.getDepartmentById(depID);
        model.addAttribute("department", department);
        model.addAttribute("depId", depID);
        return "editDep";
    }



    @RequestMapping(value = "/depSave", method = RequestMethod.POST)
    public String depSave(Department department, Model model) throws DaoExp {
        try {
            departmentService.saveOrUpdateDepartment(department);
            model.addAttribute("department", department);
            return "redirect:/";
        } catch (ValidateExp exp) {
            model.addAttribute("errorMap", exp.getErrorMap());
            return "editDep";
        }
    }*/
}

