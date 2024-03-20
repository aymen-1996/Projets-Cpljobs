package com.cpl.jobs.entities;


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
@Table(name = "experience")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "posteact")
    private String posteact;


    @Column(name = "periode")
    private String periode;

    @Column(name = "titrepost")
    private String titrepost;

    @Column(name = "typepost")
    private String typepost;

    @Column(name = "lieu")
    private String lieu;

    @Column(name = "secteuract")
    private String secteuract;

    @Column(name = "tailleentrep")
    private String tailleentrep;

    @Column(name = "categorieentreprise")
    private String catentreprise;

    @Column(name = "salairemensuel")
    private String salairemensuel;

    @Column(name = "tache")
    private String tache;

    @ManyToOne()
    @JoinColumn(name = "id_user")
    private User user;

}
