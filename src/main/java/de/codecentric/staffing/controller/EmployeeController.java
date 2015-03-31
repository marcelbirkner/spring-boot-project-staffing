package de.codecentric.staffing.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.codecentric.staffing.model.Employee;
import de.codecentric.staffing.model.Skill;
import de.codecentric.staffing.model.Employee.EmployeeBuilder;

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
    
    @RequestMapping(value = "/api/employees", method = RequestMethod.GET)
    public List<Employee> employees() {
        return employees;
    }
    
    @RequestMapping(value = "/api/employees/{id}", method = RequestMethod.DELETE)
    public void deleteEmployee(@PathVariable UUID id) {
    }
    
}
