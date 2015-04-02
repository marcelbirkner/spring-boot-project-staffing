package de.codecentric.staffing.model;

import java.util.Date;

public class Project {

    private String name;
    private String decription;
    private Date start;
    private Date end;
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDecription() {
        return decription;
    }
    public void setDecription(String decription) {
        this.decription = decription;
    }
    public Date getStart() {
        return start;
    }
    public void setStart(Date start) {
        this.start = start;
    }
    public Date getEnd() {
        return end;
    }
    public void setEnd(Date end) {
        this.end = end;
    }
    
}
