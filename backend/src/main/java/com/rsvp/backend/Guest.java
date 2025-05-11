package com.rsvp.backend;

public class Guest {
    private String name;
    private String email;
    private String attendance;

    // Constructors
    public Guest() {}

    public Guest(String name, String email, String attendance) {
        this.name = name;
        this.email = email;
        this.attendance = attendance;
    }

    // Getters & setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAttendance() { return attendance; }
    public void setAttendance(String attendance) { this.attendance = attendance; }
}
