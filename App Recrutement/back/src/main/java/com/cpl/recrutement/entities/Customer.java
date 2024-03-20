package com.cpl.recrutement.entities;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "region")
    private String region;

    @Column(name = "etude")
    private String etude;

    @Column(name = "telephone")
    private Long telephone;

    @Column(name = "cv")
    private String cv;

    @Column(name = "age")
    private Long age;



    @Column(name = "email" ,unique = true)
    private String email;

    @Column(name = "secteur")
    private String secteur;

    @Column(name = "anneeExperience")
    private String anneeExperience;



}