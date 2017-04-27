package com.aimprosoft.controller;


import com.aimprosoft.exeption.DaoExp;
import com.aimprosoft.exeption.ValidateExp;
import com.aimprosoft.model.Department;
import com.aimprosoft.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String printWelcome(){
        return "start";
    }

    @RequestMapping(value = "/depSave", method = RequestMethod.POST)
    public String depSave(Department department, Model model) throws DaoExp {
        try {
            departmentService.saveOrUpdateDepartment(department);
            model.addAttribute("department", department);
            return "redirect:/";
        } catch (ValidateExp exp) {
            model.addAttribute("errorMap", exp.getErrorMap());
            return "/";
        }
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

    @RequestMapping(value = "/depDelete", method = RequestMethod.POST)
    public String depDelete(@RequestParam("depID") Long depId) throws DaoExp {
        Department department = departmentService.getDepartmentById(depId);
        departmentService.deleteDepartment(depId);
        return "redirect:/";
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

