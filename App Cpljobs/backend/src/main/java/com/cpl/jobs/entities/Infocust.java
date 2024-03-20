package com.cpl.jobs.entities;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "infocust")
public class Infocust {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "secteur")
    private String secteur;

    @Column(name = "type")
    private String type;

    @Column(name = "categorie")
    private String categorie;



    @Column(name = "region")
    private String region;

    @Column(name = "nomentreprise")
    private String nomEntreprise;



    @Column(name = "logo")
    private String logo;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "description")
    private String description;

    @Column(name = "code")
    private String code;



    @OneToOne()
    @JoinColumn(name = "id_user")
    private User user;
}
