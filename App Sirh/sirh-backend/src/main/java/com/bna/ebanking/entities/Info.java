package com.bna.ebanking.entities;

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
@Table(name = "info")
public class Info {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "age")
    private Long age;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "caracteristiques")
    private String caracteristiques;

    @Column(name = "cnss")
    private Long cnss;

    @Column(name = "rib")
    private Long rib;

    @Column(name = "dateEmbauche")
    private String dateEmbauche;

    @Column(name = "dateDepart")
    private String dateDepart;

    @Column(name = "statut")
    private String statut;

    @Column(name = "motif")
    private String motif;

    @Column(name = "cv")
    private String cv;





}
