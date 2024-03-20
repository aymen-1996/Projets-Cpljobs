package com.bna.ebanking.enums;

public enum UserRole {


    Administrateur("administrateur"), Collaborateur("collaborateur"), Manager("manager");
    private String role;

    private UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return this.role;
    }

}
