package com.cpl.jobs.enums;

public enum UserRole {


    Administrateur("administrateur"), Client("recruteur"), Candidat("candidat");
    private String role;

    private UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return this.role;
    }

}
