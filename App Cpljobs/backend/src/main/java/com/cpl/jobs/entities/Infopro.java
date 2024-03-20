package com.cpl.jobs.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "infopro")
public class Infopro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titre")
    private String titre;

    @Column(name = "etude")
    private String etude;

    @Column(name = "experience")
    private String experience;

    @Column(name = "situation")
    private String situation;

    @Column(name = "disponibilite")
    private String disponibilite;

    @Column(name = "metier")
    private String metier;

    @Column(name = "secteur")
    private String secteur;

    @Column(name = "type")
    private String type;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "lieu")
    private String lieu;

    @ManyToOne()
    @JoinColumn(name = "id_user")
    private User user;

    @OneToMany(mappedBy="infopro")
    @JsonIgnore
    private List<Post> postList;


}
