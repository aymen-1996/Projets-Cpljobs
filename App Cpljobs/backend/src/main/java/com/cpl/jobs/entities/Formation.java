package com.cpl.jobs.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "formation")
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "diplome")
    private String diplome;

    @Column(name = "periode")
    private String periode;

    @Column(name = "pays")
    private String pays;

    @Column(name = "etablissement")
    private String etablissement;

    @Column(name = "statut")
    private String statut;

    @Column(name = "mention")
    private String mention;

    @Column(name = "description")
    private String description;


    @ManyToOne()
    @JoinColumn(name = "id_user")
    private User user;


}
