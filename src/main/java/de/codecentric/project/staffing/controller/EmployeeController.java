package de.codecentric.project.staffing.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.codecentric.project.staffing.model.Employee;
import de.codecentric.project.staffing.model.Employee.EmployeeBuilder;
import de.codecentric.project.staffing.model.Skill;

@RestController
public class EmployeeController {

    private List<Employee> employees = new ArrayList<Employee>();
    
    @PostConstruct
    public void initEmployees() {
        Skill java = new Skill("Java");
        Skill mysql = new Skill("MySQL");
        Skill junit = new Skill("jUnit");
        for (int i = 1; i < 11; i++) {
            Employee emp = EmployeeBuilder.init().
                fullName("John Doe #" + i ).
                email("john.doe-" + i + "@codecentric.de").
                office("Solingen").
                skills(java, mysql, junit).
                create();
            employees.add(emp);
        }
    }
    
    @RequestMapping("/employees")
    public List<Employee> employees() {
        return employees;
    }
    
}
