package de.codecentric.staffing.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Employee {
    
    @Id private String id;
    
    private String fullName;
    private String email;
    private String office;
    private String address;
    private List<Skill> skills;
    private List<Project> projects;
    private GeoLocation geoLocation;
    private Date createdOn;
    
    public Employee(@JsonProperty("fullName") String fullName, @JsonProperty("email") String email, @JsonProperty("office") String office) {
        this.fullName = fullName;
        this.email = email;
        this.office = office;
        this.createdOn = new Date();
    }
    
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getOffice() {
        return office;
    }
    public void setOffice(String office) {
        this.office = office;
    }
    public List<Skill> getSkills() {
        return skills;
    }
    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }
    public List<Project> getProjects() {
        return projects;
    }
    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
    public Date getCreatedOn() {
        return createdOn;
    }
    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public GeoLocation getGeoLocation() {
        return geoLocation;
    }
    public void setGeoLocation(GeoLocation geoLocation) {
        this.geoLocation = geoLocation;
    }
}
