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


public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    private String nom;
    private String prenom;
    private String pseudo;
    @Column(unique = true)
    private String email;

    private String password;

    private String role;

    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Infocan> infocanList;


    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Infopro> infoproList;

    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Formation> formationList;

    @OneToOne(mappedBy="user")
    @JsonIgnore
    private Infocust infocustList;

    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Annonce> annonceList;

    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Experience> experienceList;

    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Langue> langueList;

    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Skills> skillsList;

    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<pointfort> pointfortList;

    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Motivation> motivationList;

    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Document> documentList;








    public User(String mail, String password, String nom, String role) {
        this.nom = nom;
        this.password = password;
        this.email = mail;
        this.role=role ;
    }


}