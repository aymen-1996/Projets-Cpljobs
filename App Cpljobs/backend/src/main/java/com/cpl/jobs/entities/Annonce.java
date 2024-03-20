package com.cpl.jobs.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "annonce")
public class Annonce {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titre")
    private String titre;

    @Column(name = "description")
    @Lob
    private String description;

    @Column(name = "type")
    private String type;

    @Column(name = "etude")
    private String etude;

    @Column(name = "dispo")
    private String dispo;


    @Column(name = "experience")
    private String experience;

    @Column(name = "secteur")
    private String secteur;

    @Column(name = "statut")
    private String statut;

    @Column(name = "langue")
    private String langue;

    @ManyToOne()
    @JoinColumn(name = "id_user")
    private User user;

    @OneToMany(mappedBy="annonce")
    @JsonIgnore
    private List<Post> postList;


    @Column(name = "region")
    private String region;


    @Column(name = "date")
    private Date date;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "image")
    private String image;

    @Column(name = "nom")
    private String nom;



}
