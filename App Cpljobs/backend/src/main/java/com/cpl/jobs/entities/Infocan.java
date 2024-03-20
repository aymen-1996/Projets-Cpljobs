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
@Table(name = "infocan")
public class Infocan {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "genre")
    private String genre;

    @Column(name = "telephone")
    private Long telephone;

    @Column(name = "etat")
    private String etat;

    @Column(name = "region")
    private String region;

    @Column(name = "age")
    private Long age;

    @Column(name = "nationalite")
    private String nationalite;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "ville")
    private String ville;

    @Column(name = "code")
    private String code;

    @Column(name = "photo")
    private String photo;

    @ManyToOne()
    @JoinColumn(name = "id_user")
    private User user;

    @OneToMany(mappedBy="infocan")
    @JsonIgnore
    private List<Post> postList;

}
