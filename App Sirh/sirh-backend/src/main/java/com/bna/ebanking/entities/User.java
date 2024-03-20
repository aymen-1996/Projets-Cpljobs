package com.bna.ebanking.entities;
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
    private String image;
    private String prenom;
    private String password;
    @Column(unique = true)
    private String email;
    private Integer numtel;
    private Date created;

    @ManyToOne()
    @JoinColumn(name = "id_role")
    private Role role;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Demande> demandeList;

    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Conge> congeeList;



    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Paie> paies;




    public User(String mail, String password, String nom, String role) {
        this.nom = nom;
        this.password = password;
        this.email = mail;
    }


}