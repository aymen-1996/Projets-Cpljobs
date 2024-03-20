package com.cpl.jobs.entities;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Annotations
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Contact {

    private String nom;
    private String email;
    private String recipient;
    private String msgBody;
    private String subject;
    private Long telephone;

}
